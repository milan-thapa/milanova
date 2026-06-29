'use client'

import AdminSidebar from "@/components/admin/AdminSidebar"
import BlogForm from "@/components/admin/BlogForm"

export default function NewBlogPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Blog Post</h1>
          <p className="text-gray-600 mt-2">Add a new blog post to your website</p>
        </div>
        <BlogForm />
      </main>
    </div>
  )
}
