import { useState, useEffect } from 'react'
import {
  ReactFormBuilder,
  ReactFormGenerator,
  Registry,
} from 'react-form-builder2'
import * as Tabs from '@radix-ui/react-tabs'
import * as Dialog from '@radix-ui/react-dialog'
import { Save, X } from 'lucide-react'

// Import your custom components
import { Input as CustomInput } from '@/components/ui/input'
import { Select as CustomSelect } from '@/components/ui/select'
import { Checkbox as CustomCheckbox } from '@/components/ui/checkbox'

interface FormElement {
  key: string
  element: string
  component: React.ComponentType<any>
  type: string
  field_name: string
  name: string
  icon: string
  props: Record<string, any>
  options: Record<string, any>
}

interface FormData {
  id?: string
  element?: string
  text?: string
  field_name?: string
  required?: boolean
  options?: Record<string, any>
  [key: string]: any
}

interface SavedForm {
  name: string
  data: FormData[]
  timestamp: string
}

interface PreviewData {
  [key: string]: any
}

// Custom form elements registration
const customFormElements: FormElement[] = [
  {
    key: 'CustomInput',
    element: 'CustomInput',
    component: CustomInput,
    type: 'custom',
    field_name: 'custom_input',
    name: 'Custom Input Field',
    icon: 'fa fa-text-width',
    props: {
      className: 'form-control',
    },
    options: {},
  },
  {
    key: 'CustomSelect',
    element: 'CustomSelect',
    component: CustomSelect,
    type: 'custom',
    field_name: 'custom_select',
    name: 'Custom Select Field',
    icon: 'fa fa-caret-square-o-down',
    props: {
      className: 'form-control',
    },
    options: {},
  },
  {
    key: 'CustomCheckbox',
    element: 'CustomCheckbox',
    component: CustomCheckbox,
    type: 'custom',
    field_name: 'custom_checkbox',
    name: 'Custom Checkbox Field',
    icon: 'fa fa-check-square-o',
    props: {
      className: 'form-control',
    },
    options: {},
  },
]

declare global {
  interface Window {
    jQuery: any
    $: any
  }
}

const FormBuilder = () => {
  const [formData, setFormData] = useState<FormData[]>([])
  const [previewData, setPreviewData] = useState<PreviewData>({})
  const [showSaveDialog, setShowSaveDialog] = useState<boolean>(false)
  const [formName, setFormName] = useState<string>('')

  const isComponentRegistered = (elementName: string): boolean => {
    try {
      return (
        typeof (ReactFormBuilder as any).registry.get(elementName) !==
        'undefined'
      )
    } catch {
      return false
    }
  }

  // Register custom components once
  const registerCustomComponents = (elements: FormElement[]): void => {
    elements.forEach(({ element, component: Component }) => {
      console.log(isComponentRegistered(element), '>>')
      if (!isComponentRegistered(element)) {
        Registry.register(element, <Component />)
      }
    })
  }

  useEffect(() => {
    // Initialize jQuery
    if (typeof window !== 'undefined') {
      window.jQuery = window.$ = require('jquery')
    }

    // Register custom form elements
    // registerCustomComponents(customFormElements)

    // Subscribe to form data changes
    // ElementStore.subscribe((state) => {
    //   setFormData(state.data)
    // })

    // Load saved form
    const savedForm = localStorage.getItem('savedFormData')
    if (savedForm) {
      try {
        const parsed: SavedForm = JSON.parse(savedForm)
        setFormData(parsed.data)
        setFormName(parsed.name)
      } catch (error) {
        console.error('Error loading saved form:', error)
      }
    }
  }, [])

  const handleSave = () => {
    try {
      const formToSave = {
        name: formName,
        data: formData,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem('savedFormData', JSON.stringify(formToSave))
      setShowSaveDialog(false)
      alert('Form saved successfully!')
    } catch (error) {
      console.error('Error saving form:', error)
      alert('Error saving form. Please try again.')
    }
  }

  const handlePreviewSubmit = (data: PreviewData) => {
    setPreviewData(data)
    console.log('Preview submission:', data)
  }

  const toolbarItems = [
    ...customFormElements,
    // Add any additional default items you want to keep
  ]

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {formName || 'Untitled Form'}
          </h2>
          <button
            onClick={() => setShowSaveDialog(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            Save Form
          </button>
        </div>

        <Tabs.Root defaultValue="builder" className="w-full">
          <Tabs.List className="flex border-b">
            <Tabs.Trigger
              value="builder"
              className="px-4 py-2 border-b-2 border-transparent data-[state=active]:border-blue-600"
            >
              Builder
            </Tabs.Trigger>
            <Tabs.Trigger
              value="preview"
              className="px-4 py-2 border-b-2 border-transparent data-[state=active]:border-blue-600"
            >
              Preview
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="builder" className="p-4">
            <ReactFormBuilder
              data={formData}
              //   toolbarItems={toolbarItems}
              customToolbarItems={customFormElements}
              editMode
            />
          </Tabs.Content>

          <Tabs.Content value="preview" className="p-4">
            <ReactFormGenerator
              answer_data={previewData}
              data={formData}
              onSubmit={handlePreviewSubmit}
              hide_actions={false}
              variables={{}}
            />

            {Object.keys(previewData).length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Preview Submission:
                </h3>
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(previewData, null, 2)}
                </pre>
              </div>
            )}
          </Tabs.Content>
        </Tabs.Root>
      </div>

      {/* Save Dialog */}
      <Dialog.Root open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold">
                Save Form
              </Dialog.Title>
              <Dialog.Close className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </Dialog.Close>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Form Name
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter form name"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default FormBuilder
