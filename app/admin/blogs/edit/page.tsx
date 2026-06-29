import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/AdminSidebar"
import { prisma } from "@/lib/prisma"
import BlogForm from "@/components/admin/BlogForm"

async function getBlog(slug: string) {
  return prisma.blog.findUnique({
    where: { slug },
  })
}

export default async function EditBlogPage({ searchParams }: { searchParams: { slug?: string } }) {
  const session = await auth()
  if (!session) {
    redirect("/admin/login")
  }

  const slug = searchParams.slug
  if (!slug) {
    redirect("/admin/blogs")
  }

  const blog = await getBlog(slug)

  if (!blog) {
    redirect("/admin/blogs")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
          <p className="text-gray-600 mt-2">Update your blog post</p>
        </div>
        <BlogForm blog={{...blog, publishedAt: blog.publishedAt.toISOString()} as any} />
      </main>
    </div>
  )
}
