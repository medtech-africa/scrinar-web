'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'

function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <div className="flex w-full h-full justify-center items-center flex-col">
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <Button>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  )
}

export default ErrorPage
