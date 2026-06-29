import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/AdminSidebar"
import { prisma } from "@/lib/prisma"
import FAQForm from "@/components/admin/FAQForm"

async function getFAQ(id: string) {
  return prisma.fAQ.findUnique({
    where: { id },
  })
}

export default async function EditFAQPage({ searchParams }: { searchParams: { id?: string } }) {
  const session = await auth()
  if (!session) {
    redirect("/admin/login")
  }

  const id = searchParams.id
  if (!id) {
    redirect("/admin/faqs")
  }

  const faq = await getFAQ(id)

  if (!faq) {
    redirect("/admin/faqs")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit FAQ</h1>
          <p className="text-gray-600 mt-2">Update frequently asked question</p>
        </div>
        <FAQForm faq={faq} />
      </main>
    </div>
  )
}
