'use client'

import { useEffect, useState } from "react"
import AdminSidebar from "@/components/admin/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Loader2, Check } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('/api/admin/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => {
        toast.error('Failed to load projects')
        setLoading(false)
      })
  }, [])

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async () => {
    if (!projectToDelete) return
    
    setDeleting(projectToDelete)
    setDeleteDialogOpen(false)
    
    try {
      const res = await fetch(`/api/admin/projects?id=${projectToDelete}`, { method: 'DELETE' })
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== projectToDelete))
        toast.success('Project deleted successfully')
      } else {
        toast.error('Failed to delete project')
      }
    } catch {
      toast.error('Failed to delete project')
    } finally {
      setDeleting(null)
      setProjectToDelete(null)
    }
  }

  const openDeleteDialog = (id: string) => {
    setProjectToDelete(id)
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
    if (selectedIds.size === projects.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(projects.map(p => p.id)))
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    
    setBulkDeleteOpen(false)
    
    try {
      const deletePromises = Array.from(selectedIds).map(id => 
        fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' })
      )
      
      await Promise.all(deletePromises)
      setProjects(projects.filter(p => !selectedIds.has(p.id)))
      setSelectedIds(new Set())
      toast.success(`${selectedIds.size} project(s) deleted successfully`)
    } catch {
      toast.error('Failed to delete projects')
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-0 lg:ml-64 xl:ml-72 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage your portfolio projects</p>
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
            <Link href="/admin/projects/new">
              <Button size="default" className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </Link>
          </div>
        </div>

        {projects.length > 0 && (
          <div className="mb-4 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search projects..."
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
              {selectedIds.size === projects.length ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
        )}

        <div className="grid gap-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className={selectedIds.has(project.id) ? 'ring-2 ring-blue-500' : ''}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(project.id)}
                      onChange={() => toggleSelect(project.id)}
                      className="mt-1 w-4 h-4 rounded border-gray-300"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg sm:text-xl">{project.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.tagline}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:flex-row flex-col">
                    <Link href={`/admin/projects/${project.id}`} className="w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">Edit</Button>
                    </Link>
                    <button
                      onClick={() => openDeleteDialog(project.id)}
                      disabled={deleting === project.id}
                      className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    >
                      {deleting === project.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm">{project.category}</span>
                  <span className="text-xs sm:text-sm">{project.year}</span>
                  <span className="text-xs sm:text-sm">{project.clientName}</span>
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
          ) : filteredProjects.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-600">
                {searchQuery ? 'No projects match your search.' : 'No projects yet. Create your first project to get started.'}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </main>
      
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
      
      <ConfirmDialog
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        title="Delete Selected Projects"
        description={`Are you sure you want to delete ${selectedIds.size} project(s)? This action cannot be undone.`}
        onConfirm={handleBulkDelete}
        confirmText="Delete All"
        cancelText="Cancel"
      />
    </div>
  )
}
