'use client'

import { useEffect, useState } from "react"
import AdminSidebar from "@/components/admin/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Loader2, Check } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('/api/admin/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data)
        setLoading(false)
      })
      .catch(() => {
        toast.error('Failed to load blogs')
        setLoading(false)
      })
  }, [])

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async () => {
    if (!blogToDelete) return
    
    setDeleting(blogToDelete)
    setDeleteDialogOpen(false)
    
    try {
      const res = await fetch(`/api/admin/blogs?id=${blogToDelete}`, { method: 'DELETE' })
      if (res.ok) {
        setBlogs(blogs.filter(b => b.id !== blogToDelete))
        toast.success('Blog post deleted successfully')
      } else {
        toast.error('Failed to delete blog post')
      }
    } catch {
      toast.error('Failed to delete blog post')
    } finally {
      setDeleting(null)
      setBlogToDelete(null)
    }
  }

  const openDeleteDialog = (id: string) => {
    setBlogToDelete(id)
    setDeleteDialogOpen(true)
  }

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === blogs.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(blogs.map(b => b.id)))
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    
    setBulkDeleteOpen(false)
    
    try {
      const deletePromises = Array.from(selectedIds).map(id => 
        fetch(`/api/admin/blogs?id=${id}`, { method: 'DELETE' })
      )
      
      await Promise.all(deletePromises)
      setBlogs(blogs.filter(b => !selectedIds.has(b.id)))
      setSelectedIds(new Set())
      toast.success(`${selectedIds.size} blog post(s) deleted successfully`)
    } catch {
      toast.error('Failed to delete blog posts')
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-0 lg:ml-64 xl:ml-72 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Blogs</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage your blog posts</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {selectedIds.size > 0 && (
              <Button 
                onClick={() => setBulkDeleteOpen(true)}
                variant="destructive"
                size="default"
                className="w-full sm:w-auto"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected ({selectedIds.size})
              </Button>
            )}
            <Link href="/admin/blogs/new">
              <Button size="default" className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                New Blog Post
              </Button>
            </Link>
          </div>
        </div>

        {blogs.length > 0 && (
          <div className="mb-4 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              onClick={toggleSelectAll}
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
            >
              <Check className="w-4 h-4 mr-2" />
              {selectedIds.size === blogs.length ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
        )}

        <div className="grid gap-4">
          {filteredBlogs.map((blog) => (
            <Card key={blog.id} className={selectedIds.has(blog.id) ? 'ring-2 ring-blue-500' : ''}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(blog.id)}
                      onChange={() => toggleSelect(blog.id)}
                      className="mt-1 w-4 h-4 rounded border-gray-300"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg sm:text-xl">{blog.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{blog.excerpt}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:flex-row flex-col">
                    <Link href={`/admin/blogs/${blog.id}`} className="w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">Edit</Button>
                    </Link>
                    <button
                      onClick={() => openDeleteDialog(blog.id)}
                      disabled={deleting === blog.id}
                      className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    >
                      {deleting === blog.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm">{blog.category}</span>
                  <span className="text-xs sm:text-sm">{blog.author}</span>
                  <span className="text-xs sm:text-sm">{new Date(blog.publishedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}

          {loading ? (
            <Card>
              <CardContent className="py-12 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </CardContent>
            </Card>
          ) : filteredBlogs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-600">
                {searchQuery ? 'No blogs match your search.' : 'No blog posts yet. Create your first blog post to get started.'}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </main>
      
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Blog Post"
        description="Are you sure you want to delete this blog post? This action cannot be undone."
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
      
      <ConfirmDialog
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        title="Delete Selected Blog Posts"
        description={`Are you sure you want to delete ${selectedIds.size} blog post(s)? This action cannot be undone.`}
        onConfirm={handleBulkDelete}
        confirmText="Delete All"
        cancelText="Cancel"
      />
    </div>
  )
}
