import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/AdminSidebar"
import TestimonialForm from "@/components/admin/TestimonialForm"

export default async function NewTestimonialPage() {
  const session = await auth()
  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Testimonial</h1>
          <p className="text-gray-600 mt-2">Add a new client testimonial</p>
        </div>
        <TestimonialForm />
      </main>
    </div>
  )
}
