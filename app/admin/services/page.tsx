'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from "@/components/admin/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Edit2 } from "lucide-react"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    order: 0,
    isActive: true
  })

  useEffect(() => {
    fetch('/api/admin/services')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => setServices(data.sort((a: any, b: any) => a.order - b.order)))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    // Check for duplicates
    const duplicate = services.find(s => s.title.toLowerCase() === formData.title.toLowerCase())
    if (duplicate) {
      setMessage('A service with this title already exists')
      setSaving(false)
      return
    }

    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to create')

      const result = await res.json()
      setServices([...services, result].sort((a, b) => a.order - b.order))
      setMessage('Service created successfully!')
      setShowAddForm(false)
      setFormData({ title: '', description: '', icon: '', order: services.length, isActive: true })
    } catch (error) {
      setMessage('Failed to create service')
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
      const res = await fetch(`/api/admin/services?id=${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to update')

      const result = await res.json()
      setServices(services.map(s => s.id === editingId ? result : s).sort((a, b) => a.order - b.order))
      setMessage('Service updated successfully!')
      setEditingId(null)
      setFormData({ title: '', description: '', icon: '', order: 0, isActive: true })
    } catch (error) {
      setMessage('Failed to update service')
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    setServiceToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!serviceToDelete) return

    try {
      const res = await fetch(`/api/admin/services?id=${serviceToDelete}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete')

      setServices(services.filter(s => s.id !== serviceToDelete))
      setMessage('Service deleted successfully!')
    } catch (error) {
      setMessage('Failed to delete service')
      console.error(error)
    } finally {
      setDeleteDialogOpen(false)
      setServiceToDelete(null)
    }
  }

  const startEdit = (service: any) => {
    setEditingId(service.id)
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon || '',
      order: service.order,
      isActive: service.isActive
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({ title: '', description: '', icon: '', order: 0, isActive: true })
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
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-2">Manage services displayed on the website</p>
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
            Add New Service
          </Button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <Card className="mb-6 border-2 border-dashed border-gray-300">
            <CardHeader>
              <CardTitle className="text-lg">Add New Service</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <Label htmlFor="add-title">Title *</Label>
                  <Input
                    id="add-title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Web Development"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="add-description">Description *</Label>
                  <Input
                    id="add-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the service"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="add-icon">Icon (emoji or SVG name)</Label>
                    <Input
                      id="add-icon"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="e.g., 💻 or code"
                    />
                  </div>
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
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="add-active"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="add-active">Active</Label>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Service'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Services List */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Services ({services.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {services.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No services found. Add your first service above.</p>
            ) : (
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    {editingId === service.id ? (
                      <form onSubmit={handleUpdate} className="space-y-3">
                        <div>
                          <Label htmlFor={`edit-title-${service.id}`}>Title</Label>
                          <Input
                            id={`edit-title-${service.id}`}
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor={`edit-description-${service.id}`}>Description</Label>
                          <Input
                            id={`edit-description-${service.id}`}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor={`edit-icon-${service.id}`}>Icon</Label>
                            <Input
                              id={`edit-icon-${service.id}`}
                              value={formData.icon}
                              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edit-order-${service.id}`}>Order</Label>
                            <Input
                              id={`edit-order-${service.id}`}
                              type="number"
                              value={formData.order}
                              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                              required
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`edit-active-${service.id}`}
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className="w-4 h-4"
                          />
                          <Label htmlFor={`edit-active-${service.id}`}>Active</Label>
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
                            {service.icon && <span className="text-2xl">{service.icon}</span>}
                            <span className="font-medium text-gray-900">{service.title}</span>
                            {!service.isActive && (
                              <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">Inactive</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                          <div className="text-sm text-gray-400 mt-1">Order: {service.order}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => startEdit(service)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>
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
      title="Delete Service"
      description="Are you sure you want to delete this service? This action cannot be undone."
      onConfirm={confirmDelete}
      confirmText="Delete"
      cancelText="Cancel"
    />
    </>
  )
}
