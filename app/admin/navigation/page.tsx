'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from "@/components/admin/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Edit2, X } from "lucide-react"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"

export default function AdminNavigation() {
  const [links, setLinks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    href: '',
    order: 0,
    isActive: true
  })

  useEffect(() => {
    fetch('/api/admin/navigation')
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.error || 'Failed to fetch')
          })
        }
        return res.json()
      })
      .then(data => setLinks(data.sort((a: any, b: any) => a.order - b.order)))
      .catch(err => {
        console.error('Error fetching navigation:', err)
        setMessage(`Error: ${err.message}`)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    // Check for duplicates
    const duplicate = links.find(l => l.name.toLowerCase() === formData.name.toLowerCase() || l.href === formData.href)
    if (duplicate) {
      setMessage('A link with this name or URL already exists')
      setSaving(false)
      return
    }

    try {
      const res = await fetch('/api/admin/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to create')

      const result = await res.json()
      setLinks([...links, result].sort((a, b) => a.order - b.order))
      setMessage('Link created successfully!')
      setShowAddForm(false)
      setFormData({ name: '', href: '', order: links.length, isActive: true })
    } catch (error) {
      setMessage('Failed to create link')
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return
    setSaving(true)
    setMessage('')

    try {
      const res = await fetch(`/api/admin/navigation?id=${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to update')

      const result = await res.json()
      setLinks(links.map(l => l.id === editingId ? result : l).sort((a, b) => a.order - b.order))
      setMessage('Link updated successfully!')
      setEditingId(null)
      setFormData({ name: '', href: '', order: 0, isActive: true })
    } catch (error) {
      setMessage('Failed to update link')
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    setLinkToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!linkToDelete) return

    try {
      const res = await fetch(`/api/admin/navigation?id=${linkToDelete}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete')

      setLinks(links.filter(l => l.id !== linkToDelete))
      setMessage('Link deleted successfully!')
    } catch (error) {
      setMessage('Failed to delete link')
      console.error(error)
    } finally {
      setDeleteDialogOpen(false)
      setLinkToDelete(null)
    }
  }

  const startEdit = (link: any) => {
    setEditingId(link.id)
    setFormData({
      name: link.name,
      href: link.href,
      order: link.order,
      isActive: link.isActive
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({ name: '', href: '', order: 0, isActive: true })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8">
          <p>Loading...</p>
        </main>
      </div>
    )
  }

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Navigation</h1>
          <p className="text-gray-600 mt-2">Manage navbar navigation links</p>
          {message && (
            <p className={`mt-2 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </div>

        {/* Add New Button */}
        <div className="mb-6">
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Link
          </Button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <Card className="mb-6 border-2 border-dashed border-gray-300">
            <CardHeader>
              <CardTitle className="text-lg">Add New Navigation Link</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="add-name">Name *</Label>
                    <Input
                      id="add-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Home"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="add-href">URL *</Label>
                    <Input
                      id="add-href"
                      value={formData.href}
                      onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                      placeholder="e.g., /"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="add-order">Order *</Label>
                    <Input
                      id="add-order"
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="add-active"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="add-active">Active</Label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Link'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Links List */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Links ({links.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {links.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No navigation links found. Add your first link above.</p>
            ) : (
              <div className="space-y-3">
                {links.map((link) => (
                  <div key={link.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    {editingId === link.id ? (
                      <form onSubmit={handleUpdate} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor={`edit-name-${link.id}`}>Name</Label>
                            <Input
                              id={`edit-name-${link.id}`}
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edit-href-${link.id}`}>URL</Label>
                            <Input
                              id={`edit-href-${link.id}`}
                              value={formData.href}
                              onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor={`edit-order-${link.id}`}>Order</Label>
                            <Input
                              id={`edit-order-${link.id}`}
                              type="number"
                              value={formData.order}
                              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                              required
                            />
                          </div>
                          <div className="flex items-center gap-2 pt-6">
                            <input
                              type="checkbox"
                              id={`edit-active-${link.id}`}
                              checked={formData.isActive}
                              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                              className="w-4 h-4"
                            />
                            <Label htmlFor={`edit-active-${link.id}`}>Active</Label>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button type="submit" disabled={saving} size="sm">
                            {saving ? 'Saving...' : 'Save'}
                          </Button>
                          <Button type="button" variant="outline" size="sm" onClick={cancelEdit}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-gray-900">{link.name}</span>
                            <span className="text-sm text-gray-500">{link.href}</span>
                            {!link.isActive && (
                              <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">Inactive</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-400 mt-1">Order: {link.order}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => startEdit(link)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(link.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>

    <ConfirmDialog
      open={deleteDialogOpen}
      onOpenChange={setDeleteDialogOpen}
      title="Delete Navigation Link"
      description="Are you sure you want to delete this link? This action cannot be undone."
      onConfirm={confirmDelete}
      confirmText="Delete"
      cancelText="Cancel"
    />
    </>
  )
}
