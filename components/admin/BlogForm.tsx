'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NextImage from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import RichTextEditor from './RichTextEditor'
import { ImageUpload } from '@/components/admin/ImageUpload'
import TagInput from '@/components/admin/TagInput'
import { toast } from 'sonner'

interface Category {
  id: string
  name: string
  slug: string
}

interface Author {
  id: string
  name: string
  slug: string
}

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  categoryId: string | null
  authorId: string | null
  tags: string[]
  publishedAt: string
  coverImage: string
  readingTime: number
}

export default function BlogForm({ blog }: { blog?: Blog }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [allBlogs, setAllBlogs] = useState<Blog[]>([])
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    slug: blog?.slug || '',
    excerpt: blog?.excerpt || '',
    content: blog?.content || '',
    categoryId: blog?.categoryId || '',
    authorId: blog?.authorId || '',
    tags: blog?.tags || [],
    publishedAt: blog?.publishedAt ? new Date(blog.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    coverImage: blog?.coverImage || '',
    readingTime: blog?.readingTime || 5,
    relatedPosts: [] as string[],
  })

  useEffect(() => {
    fetchCategories()
    fetchAuthors()
    fetchAllBlogs()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchAuthors = async () => {
    try {
      const response = await fetch('/api/admin/authors')
      const data = await response.json()
      setAuthors(data)
    } catch (error) {
      console.error('Error fetching authors:', error)
    }
  }

  const fetchAllBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs')
      const data = await response.json()
      setAllBlogs(data.filter((b: Blog) => b.id !== blog?.id))
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleAutoGenerateSlug = () => {
    if (formData.title) {
      setFormData({ ...formData, slug: generateSlug(formData.title) })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/blogs', {
        method: blog ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: blog?.id,
          ...formData,
          tags: formData.tags,
          publishedAt: new Date(formData.publishedAt),
          readingTime: Number(formData.readingTime),
          categoryId: formData.categoryId || null,
          authorId: formData.authorId || null,
          relatedPosts: formData.relatedPosts,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to save blog post')
        return
      }

      router.push('/admin/blogs')
    } catch (err) {
      console.error('Error saving blog:', err)
      setError('An error occurred while saving the blog post')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('folder', 'blogs')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Failed to upload image')
        return null
      }

      setFormData((prev) => ({ ...prev, coverImage: data.url }))
      toast.success('Image uploaded successfully')
      return data.url
    } catch (uploadError) {
      console.error('Error uploading image:', uploadError)
      toast.error('Failed to upload image')
      return null
    }
  }

  const handleEditorImageUpload = async (file: File) => {
    return handleImageUpload(file)
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-xl sm:text-2xl">{blog ? 'Edit Blog Post' : 'Create Blog Post'}</CardTitle>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="w-full sm:w-auto"
          >
            {showPreview ? 'Edit' : 'Preview'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {showPreview ? (
          <div className="space-y-6">
            {/* Preview Mode */}
            <div className="border rounded-lg p-4 sm:p-6 bg-gray-50">
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.tags.map((tag: string, i: number) => (
                  tag.trim() && (
                    <span
                      key={i}
                      className="bg-lime/20 text-teal text-xs font-semibold uppercase tracking-wider rounded-full px-3 py-1"
                    >
                      {tag.trim()}
                    </span>
                  )
                ))}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-text-dark">
                {formData.title || 'Untitled Post'}
              </h1>

              <p className="text-base sm:text-lg text-text-body mb-6">
                {formData.excerpt || 'No excerpt'}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-text-muted text-sm border-t border-b border-gray-200 py-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal rounded-full flex items-center justify-center text-white font-semibold">
                    {authors.find(a => a.id === formData.authorId)?.name?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <p className="text-text-body font-medium">{authors.find(a => a.id === formData.authorId)?.name || 'Unknown Author'}</p>
                    <p className="text-xs">{new Date(formData.publishedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formData.readingTime} min read</span>
                </div>
              </div>

              {formData.coverImage && (
                <div className="aspect-video bg-gradient-to-br from-off-white to-cream rounded-2xl mb-6 overflow-hidden relative">
                  <NextImage
                    src={formData.coverImage}
                    alt="Blog post cover image preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: formData.content || '<p>No content yet...</p>' }} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                onClick={() => setShowPreview(false)}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Back to Edit
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? 'Saving...' : blog ? 'Update Blog Post' : 'Create Blog Post'}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <div className="flex gap-2">
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  required
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAutoGenerateSlug}
                  disabled={!formData.title}
                >
                  Auto
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              onImageUpload={handleEditorImageUpload}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoryId">Category</Label>
              <select
                id="categoryId"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorId">Author</Label>
              <select
                id="authorId"
                value={formData.authorId}
                onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <option value="">Select an author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="readingTime">Reading Time (min)</Label>
              <Input
                id="readingTime"
                type="number"
                value={formData.readingTime}
                onChange={(e) => setFormData({ ...formData, readingTime: parseInt(e.target.value) || 5 })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="publishedAt">Published Date *</Label>
              <Input
                id="publishedAt"
                type="date"
                value={formData.publishedAt}
                onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <TagInput
                value={formData.tags}
                onChange={(tags) => setFormData({ ...formData, tags })}
                label="Tags"
                placeholder="Type and press Enter to add tag"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image</Label>
            <ImageUpload
              value={formData.coverImage}
              onChange={(url) => setFormData({ ...formData, coverImage: url })}
              label="Cover Image"
              folder="blogs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relatedPosts">Related Posts</Label>
            <div className="border border-gray-300 rounded-md p-4 max-h-60 overflow-y-auto">
              {allBlogs.length === 0 ? (
                <p className="text-gray-500 text-sm">No other blogs available to relate</p>
              ) : (
                <div className="space-y-2">
                  {allBlogs.map((blogItem) => (
                    <label key={blogItem.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={formData.relatedPosts.includes(blogItem.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              relatedPosts: [...formData.relatedPosts, blogItem.id]
                            })
                          } else {
                            setFormData({
                              ...formData,
                              relatedPosts: formData.relatedPosts.filter(id => id !== blogItem.id)
                            })
                          }
                        }}
                        className="w-4 h-4 text-teal rounded focus:ring-teal"
                      />
                      <span className="text-sm">{blogItem.title}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">Select posts that are related to this blog post</p>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : blog ? 'Update Blog Post' : 'Create Blog Post'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/blogs')}
            >
              Cancel
            </Button>
          </div>
        </form>
        )}
      </CardContent>
    </Card>
  )
}
