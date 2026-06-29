import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import BlogForm from "@/components/admin/BlogForm"
import AdminSidebar from "@/components/admin/AdminSidebar"

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) {
    redirect("/admin/login")
  }

  const blog = await prisma.blog.findUnique({
    where: { id: params.id },
  })

  if (!blog) {
    redirect("/admin/blogs")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-8">
        <BlogForm blog={{...blog, publishedAt: blog.publishedAt.toISOString()} as any} />
      </div>
    </div>
  )
}
