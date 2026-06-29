import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import TestimonialForm from "@/components/admin/TestimonialForm"
import AdminSidebar from "@/components/admin/AdminSidebar"

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) {
    redirect("/admin/login")
  }

  const testimonial = await prisma.testimonial.findUnique({
    where: { id: params.id },
  })

  if (!testimonial) {
    redirect("/admin/testimonials")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-8">
        <TestimonialForm testimonial={testimonial} />
      </div>
    </div>
  )
}
