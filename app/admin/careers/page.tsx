'use client'

import { useEffect, useState } from "react"
import AdminSidebar from "@/components/admin/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Loader2, Edit } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"

export default function AdminCareers() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [jobToDelete, setJobToDelete] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data)
        setLoading(false)
      })
      .catch(() => {
        toast.error('Failed to load jobs')
        setLoading(false)
      })
  }, [])

  const handleDelete = async () => {
    if (!jobToDelete) return
    
    setDeleting(jobToDelete)
    setDeleteDialogOpen(false)
    
    try {
      const res = await fetch(`/api/admin/jobs?id=${jobToDelete}`, { method: 'DELETE' })
      if (res.ok) {
        setJobs(jobs.filter(j => j.id !== jobToDelete))
        toast.success('Job posting deleted successfully')
      } else {
        toast.error('Failed to delete job posting')
      }
    } catch {
      toast.error('Failed to delete job posting')
    } finally {
      setDeleting(null)
      setJobToDelete(null)
    }
  }

  const openDeleteDialog = (id: string) => {
    setJobToDelete(id)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-0 lg:ml-64 xl:ml-72 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Careers</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage job postings</p>
          </div>
          <Link href="/admin/careers/new">
            <Button size="default" className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              New Job Posting
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-lg sm:text-xl">{job.title}</CardTitle>
                      {job.isFeatured && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Featured</span>
                      )}
                      {!job.isActive && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Inactive</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{job.description}</p>
                  </div>
                  <div className="flex gap-2 sm:flex-row flex-col">
                    <Link href={`/admin/careers/${job.id}`} className="w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <button
                      onClick={() => openDeleteDialog(job.id)}
                      disabled={deleting === job.id}
                      className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    >
                      {deleting === job.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm">{job.department}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm">{job.type.replace('_', ' ')}</span>
                  <span className="text-xs sm:text-sm">{job.location}</span>
                  <span className="text-xs sm:text-sm">{new Date(job.createdAt).toLocaleDateString()}</span>
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
          ) : jobs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-600">
                No job postings yet. Create your first job posting to get started.
              </CardContent>
            </Card>
          ) : null}
        </div>
      </main>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Job Posting"
        description="Are you sure you want to delete this job posting? This action cannot be undone."
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  )
}
