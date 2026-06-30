'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, Calendar, Search, Trash2, Check, Download } from 'lucide-react'
import { toast } from 'sonner'
import { ContactSkeleton } from '@/components/shared/Skeleton'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'

interface ContactSubmission {
  id: string
  fullName: string
  email: string
  phone: string | null
  projectDetails: string
  createdAt: string
  isRead: boolean
}

export default function AdminContact() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [submissionToDelete, setSubmissionToDelete] = useState<string | null>(null)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/contact')
      const data = await response.json()
      setSubmissions(data)
    } catch (error) {
      console.error('Error fetching submissions:', error)
      toast.error('Failed to load submissions')
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/contact/${id}/read`, {
        method: 'PUT'
      })
      if (response.ok) {
        setSubmissions(submissions.map(s => 
          s.id === id ? { ...s, isRead: true } : s
        ))
        toast.success('Marked as read')
      }
    } catch (error) {
      toast.error('Failed to mark as read')
    }
  }

  const deleteSubmission = async (id: string) => {
    setSubmissionToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!submissionToDelete) return
    
    try {
      const response = await fetch(`/api/admin/contact/${submissionToDelete}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setSubmissions(submissions.filter(s => s.id !== submissionToDelete))
        toast.success('Submission deleted')
      }
    } catch (error) {
      toast.error('Failed to delete submission')
    } finally {
      setDeleteDialogOpen(false)
      setSubmissionToDelete(null)
    }
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Project Details', 'Date', 'Status']
    const rows = filteredSubmissions.map(s => [
      s.fullName,
      s.email,
      s.phone || '',
      s.projectDetails.replace(/,/g, ';'),
      new Date(s.createdAt).toLocaleDateString(),
      s.isRead ? 'Read' : 'Unread'
    ])
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Exported to CSV')
  }

  const filteredSubmissions = submissions.filter(s => {
    const matchesSearch = 
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.projectDetails.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = 
      filterStatus === 'all' || 
      (filterStatus === 'unread' && !s.isRead) ||
      (filterStatus === 'read' && s.isRead)
    
    return matchesSearch && matchesFilter
  })

  const unreadCount = submissions.filter(s => !s.isRead).length

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 ml-0 lg:ml-64 xl:ml-72 p-4 sm:p-6 lg:p-8">
          <ContactSkeleton />
        </main>
      </div>
    )
  }

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 ml-0 lg:ml-64 xl:ml-72 p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-gray-600 mt-2">View and manage messages from your contact form</p>
        </div>

        {/* Stats and Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">{submissions.length}</div>
              <div className="text-sm text-gray-600">Total Submissions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-brand-dark">{unreadCount}</div>
              <div className="text-sm text-gray-600">Unread</div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Quick Actions</div>
                <div className="text-xs text-gray-600">Export or manage submissions</div>
              </div>
              <Button onClick={exportToCSV} variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name, email, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              className={filterStatus === 'all' ? 'bg-brand-dark hover:bg-brand-dark/90 text-white' : ''}
            >
              All ({submissions.length})
            </Button>
            <Button
              variant={filterStatus === 'unread' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('unread')}
              className={filterStatus === 'unread' ? 'bg-brand-dark hover:bg-brand-dark/90 text-white' : ''}
            >
              Unread ({unreadCount})
            </Button>
            <Button
              variant={filterStatus === 'read' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('read')}
              className={filterStatus === 'read' ? 'bg-brand-dark hover:bg-brand-dark/90 text-white' : ''}
            >
              Read ({submissions.length - unreadCount})
            </Button>
          </div>
        </div>

        {/* Submissions List */}
        <div className="grid gap-4">
          {filteredSubmissions.map((submission) => (
            <Card key={submission.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{submission.fullName}</CardTitle>
                      {!submission.isRead && (
                        <Badge variant="default" className="bg-brand-dark text-white">New</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {submission.email}
                      </div>
                      {submission.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {submission.phone}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!submission.isRead && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsRead(submission.id)}
                        className="gap-1"
                      >
                        <Check className="w-4 h-4" />
                        Mark Read
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteSubmission(submission.id)}
                      className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Project Details:</p>
                  <p className="text-gray-600 whitespace-pre-wrap">{submission.projectDetails}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredSubmissions.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-gray-600">
                {searchQuery || filterStatus !== 'all' 
                  ? 'No submissions match your search or filter.' 
                  : 'No contact submissions yet.'}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>

    <ConfirmDialog
      open={deleteDialogOpen}
      onOpenChange={setDeleteDialogOpen}
      title="Delete Contact Submission"
      description="Are you sure you want to delete this submission? This action cannot be undone."
      onConfirm={confirmDelete}
      confirmText="Delete"
      cancelText="Cancel"
    />
    </>
  )
}
