'use client'

import { useEffect, useState } from "react"
import AdminSidebar from "@/components/admin/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2, ExternalLink, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  REVIEWED: 'bg-blue-100 text-blue-800',
  INTERVIEW: 'bg-purple-100 text-purple-800',
  ACCEPTED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
}

export default function AdminApplications() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  useEffect(() => {
    fetch('/api/admin/applications')
      .then(res => res.json())
      .then(data => {
        setApplications(data)
        setLoading(false)
      })
      .catch(() => {
        toast.error('Failed to load applications')
        setLoading(false)
      })
  }, [])

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.job.title.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleDelete = async () => {
    if (!applicationToDelete) return
    
    setDeleting(applicationToDelete)
    setDeleteDialogOpen(false)
    
    try {
      const res = await fetch(`/api/admin/applications?id=${applicationToDelete}`, { method: 'DELETE' })
      if (res.ok) {
        setApplications(applications.filter(a => a.id !== applicationToDelete))
        toast.success('Application deleted successfully')
      } else {
        toast.error('Failed to delete application')
      }
    } catch {
      toast.error('Failed to delete application')
    } finally {
      setDeleting(null)
      setApplicationToDelete(null)
    }
  }

  const openDeleteDialog = (id: string) => {
    setApplicationToDelete(id)
    setDeleteDialogOpen(true)
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/applications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      })
      
      if (res.ok) {
        setApplications(applications.map(a => a.id === id ? { ...a, status: newStatus } : a))
        toast.success('Status updated successfully')
      } else {
        toast.error('Failed to update status')
      }
    } catch {
      toast.error('Failed to update status')
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-0 lg:ml-64 xl:ml-72 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Applications</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage job applications</p>
          </div>
        </div>

        <div className="mb-4 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="REVIEWED">Reviewed</option>
            <option value="INTERVIEW">Interview</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <div className="grid gap-4">
          {filteredApplications.map((application) => (
            <Card key={application.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <CardTitle className="text-lg sm:text-xl">{application.fullName}</CardTitle>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[application.status as keyof typeof statusColors]}`}>
                        {application.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{application.email}</p>
                    <p className="text-sm text-gray-600">{application.phone}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Position:</span> {application.job.title}
                    </p>
                  </div>
                  <div className="flex gap-2 sm:flex-row flex-col">
                    <a
                      href={application.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-1 w-full sm:w-auto"
                    >
                      <Download className="w-4 h-4" />
                      Resume
                    </a>
                    {application.linkedinUrl && (
                      <a
                        href={application.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center justify-center gap-1 w-full sm:w-auto"
                      >
                        <ExternalLink className="w-4 h-4" />
                        LinkedIn
                      </a>
                    )}
                    {application.portfolioUrl && (
                      <a
                        href={application.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center justify-center gap-1 w-full sm:w-auto"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Portfolio
                      </a>
                    )}
                    <button
                      onClick={() => openDeleteDialog(application.id)}
                      disabled={deleting === application.id}
                      className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    >
                      {deleting === application.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </CardHeader>
              {application.coverLetter && (
                <CardContent>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Cover Letter:</span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1 line-clamp-3">{application.coverLetter}</p>
                </CardContent>
              )}
              <CardContent>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <span className="text-xs sm:text-sm">{new Date(application.createdAt).toLocaleDateString()}</span>
                  <div className="flex gap-1">
                    {['PENDING', 'REVIEWED', 'INTERVIEW', 'ACCEPTED', 'REJECTED'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(application.id, status)}
                        className={`px-2 py-1 rounded text-xs ${
                          application.status === status
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {status.charAt(0) + status.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>
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
          ) : filteredApplications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-600">
                {searchQuery || statusFilter !== 'ALL' ? 'No applications match your filters.' : 'No applications yet.'}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </main>
      
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Application"
        description="Are you sure you want to delete this application? This action cannot be undone."
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  )
}
