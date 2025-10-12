import { redirect } from 'next/navigation'

export const generateStaticParams = async () => []

export default function Page() {
  redirect('/posts')
}
