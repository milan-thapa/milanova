import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import FAQForm from "@/components/admin/FAQForm"
import AdminSidebar from "@/components/admin/AdminSidebar"

export default async function EditFAQPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) {
    redirect("/admin/login")
  }

  const faq = await prisma.fAQ.findUnique({
    where: { id: params.id },
  })

  if (!faq) {
    redirect("/admin/faqs")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-8">
        <FAQForm faq={faq} />
      </div>
    </div>
  )
}
