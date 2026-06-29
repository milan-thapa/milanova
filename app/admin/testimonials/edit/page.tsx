import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/AdminSidebar"
import { prisma } from "@/lib/prisma"
import TestimonialForm from "@/components/admin/TestimonialForm"

async function getTestimonial(id: string) {
  return prisma.testimonial.findUnique({
    where: { id },
  })
}

export default async function EditTestimonialPage({ searchParams }: { searchParams: { id?: string } }) {
  const session = await auth()
  if (!session) {
    redirect("/admin/login")
  }

  const id = searchParams.id
  if (!id) {
    redirect("/admin/testimonials")
  }

  const testimonial = await getTestimonial(id)

  if (!testimonial) {
    redirect("/admin/testimonials")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Testimonial</h1>
          <p className="text-gray-600 mt-2">Update client testimonial</p>
        </div>
        <TestimonialForm testimonial={testimonial} />
      </main>
    </div>
  )
}
