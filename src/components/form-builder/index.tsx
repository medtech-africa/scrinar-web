import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

// Cache for Bootstrap CSS
let bootstrapCSSCache: string | null = null

const FormBuilderComp = dynamic(
  () => import('./form-builder-2').then((mod) => mod.FormBuilderComp2),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    ),
  }
)
const FormBuilder = () => {
  const [isStylesLoaded, setIsStylesLoaded] = useState(false)

  useEffect(() => {
    const loadStyles = async () => {
      try {
        // Create style elements
        const bootstrapStyle = document.createElement('style')
        bootstrapStyle.id = 'bootstrap-scoped'

        // Add Font Awesome with preload
        const fontAwesomeLink = document.createElement('link')
        fontAwesomeLink.id = 'fontawesome-link'
        fontAwesomeLink.rel = 'stylesheet'
        fontAwesomeLink.href =
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'

        // Add preload link for Font Awesome
        const preloadFA = document.createElement('link')
        preloadFA.rel = 'preload'
        preloadFA.as = 'style'
        preloadFA.href = fontAwesomeLink.href

        // Fetch and process Bootstrap CSS if not cached
        if (!bootstrapCSSCache) {
          const response = await fetch(
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
          )
          const css = await response.text()

          // Scope Bootstrap styles
          bootstrapCSSCache = css
            .replace(
              /(@media[^{]+{)([\s\S]+?})\s*}/g,
              (match, media, rules) => {
                return `${media} .bootstrap-scope ${rules} }`
              }
            )
            .replace(/([^{}]*){([^{}]*)}/g, (match, selector, rules) => {
              if (selector.trim().startsWith('@')) return match
              const scopedSelector = selector
                .split(',')
                .map((s: string) => `.bootstrap-scope ${s.trim()}`)
                .join(',')
              return `${scopedSelector}{${rules}}`
            })
        }

        // Apply cached Bootstrap styles
        bootstrapStyle.textContent = bootstrapCSSCache

        // Add everything to head
        document.head.appendChild(preloadFA)
        document.head.appendChild(fontAwesomeLink)
        document.head.appendChild(bootstrapStyle)

        setIsStylesLoaded(true)
      } catch (error) {
        console.error('Error loading styles:', error)
        // Still set as loaded to prevent infinite loading state
        setIsStylesLoaded(true)
      }
    }

    loadStyles()

    return () => {
      // Cleanup
      const elements = ['bootstrap-scoped', 'fontawesome-link'].map((id) =>
        document.getElementById(id)
      )

      elements.forEach((element) => element?.remove())
    }
  }, [])

  if (!isStylesLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="bootstrap-scope">
      <div className="form-builder-container">
        <FormBuilderComp />
      </div>
      <style jsx>{`
        .react-form-builder {
          background-color: red;
        }
        .react-form-builder > div {
          display: flex;
        }
      `}</style>
    </div>
  )
}

export { FormBuilder }
