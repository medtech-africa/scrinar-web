import { redirect } from 'next/navigation'

export default async function Home() {
  await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1')

  redirect('/login')

  return
}
