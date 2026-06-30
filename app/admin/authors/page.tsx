'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageUpload } from '@/components/admin/ImageUpload'
import NextImage from 'next/image'

interface Author {
  id: string
  name: string
  slug: string
  email: string | null
  bio: string | null
  image: string | null
  role: string | null
  twitter: string | null
  linkedin: string | null
  github: string | null
  isActive: boolean
  _count: {
    blogs: number
  }
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    email: '',
    bio: '',
    image: '',
    role: '',
    twitter: '',
    linkedin: '',
    github: '',
    isActive: true
  })

  useEffect(() => {
    fetchAuthors()
  }, [])

  const fetchAuthors = async () => {
    try {
      const response = await fetch('/api/admin/authors')
      const data = await response.json()
      setAuthors(data)
    } catch (error) {
      console.error('Error fetching authors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingAuthor
        ? `/api/admin/authors/${editingAuthor.id}`
        : '/api/admin/authors'
      const method = editingAuthor ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setShowForm(false)
        setEditingAuthor(null)
        setFormData({
          name: '',
          slug: '',
          email: '',
          bio: '',
          image: '',
          role: '',
          twitter: '',
          linkedin: '',
          github: '',
          isActive: true
        })
        fetchAuthors()
      }
    } catch (error) {
      console.error('Error saving author:', error)
    }
  }

  const handleEdit = (author: Author) => {
    setEditingAuthor(author)
    setFormData({
      name: author.name,
      slug: author.slug,
      email: author.email || '',
      bio: author.bio || '',
      image: author.image || '',
      role: author.role || '',
      twitter: author.twitter || '',
      linkedin: author.linkedin || '',
      github: author.github || '',
      isActive: author.isActive
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this author?')) return

    try {
      const response = await fetch(`/api/admin/authors/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchAuthors()
      }
    } catch (error) {
      console.error('Error deleting author:', error)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingAuthor(null)
    setFormData({
      name: '',
      slug: '',
      email: '',
      bio: '',
      image: '',
      role: '',
      twitter: '',
      linkedin: '',
      github: '',
      isActive: true
    })
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-0 lg:ml-64 xl:ml-72 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Authors</h1>
          <Button onClick={() => setShowForm(true)} className="gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Add Author
          </Button>
        </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>{editingAuthor ? 'Edit Author' : 'New Author'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="auto-generated if empty"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g., Senior Developer"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={3}
                      placeholder="Short biography..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Profile Image</Label>
                    <ImageUpload
                      value={formData.image}
                      onChange={(url) => setFormData({ ...formData, image: url })}
                      label="Profile Image"
                      folder="authors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={formData.twitter}
                        onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                        placeholder="@username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        placeholder="linkedin.com/in/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        value={formData.github}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        placeholder="github.com/..."
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-teal rounded focus:ring-teal"
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button type="submit" className="w-full sm:w-auto">{editingAuthor ? 'Update' : 'Create'}</Button>
                    <Button type="button" variant="outline" onClick={handleCancel} className="w-full sm:w-auto">
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.map((author) => (
          <Card key={author.id} className={!author.isActive ? 'opacity-60' : ''}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                {author.image ? (
                  <NextImage
                    src={author.image}
                    alt={author.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-semibold">
                      {author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <CardTitle className="text-base">{author.name}</CardTitle>
                  {author.role && (
                    <p className="text-xs text-gray-500">{author.role}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(author)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(author.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600 line-clamp-2">{author.bio || 'No bio'}</p>
                <div className="flex gap-2 text-gray-500">
                  {author.email && <Mail className="w-4 h-4" />}
                  {author.twitter && <span className="text-xs">X</span>}
                  {author.linkedin && <span className="text-xs">in</span>}
                  {author.github && <span className="text-xs">GH</span>}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Slug: {author.slug}</span>
                  <span>{author._count.blogs} blogs</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </main>
    </div>
  )
}
