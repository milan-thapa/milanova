'use client'

import { useEffect, useState } from "react"
import AdminSidebar from "@/components/admin/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Loader2, Check } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [faqToDelete, setFaqToDelete] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('/api/admin/faqs')
      .then(res => res.json())
      .then(data => {
        setFaqs(data)
        setLoading(false)
      })
      .catch(() => {
        toast.error('Failed to load FAQs')
        setLoading(false)
      })
  }, [])

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async () => {
    if (!faqToDelete) return
    
    setDeleting(faqToDelete)
    setDeleteDialogOpen(false)
    
    try {
      const res = await fetch(`/api/admin/faqs?id=${faqToDelete}`, { method: 'DELETE' })
      if (res.ok) {
        setFaqs(faqs.filter(f => f.id !== faqToDelete))
        toast.success('FAQ deleted successfully')
      } else {
        toast.error('Failed to delete FAQ')
      }
    } catch {
      toast.error('Failed to delete FAQ')
    } finally {
      setDeleting(null)
      setFaqToDelete(null)
    }
  }

  const openDeleteDialog = (id: string) => {
    setFaqToDelete(id)
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
    if (selectedIds.size === faqs.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(faqs.map(f => f.id)))
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    
    setBulkDeleteOpen(false)
    
    try {
      const deletePromises = Array.from(selectedIds).map(id => 
        fetch(`/api/admin/faqs?id=${id}`, { method: 'DELETE' })
      )
      
      await Promise.all(deletePromises)
      setFaqs(faqs.filter(f => !selectedIds.has(f.id)))
      setSelectedIds(new Set())
      toast.success(`${selectedIds.size} FAQ(s) deleted successfully`)
    } catch {
      toast.error('Failed to delete FAQs')
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-0 lg:ml-64 xl:ml-72 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">FAQs</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage frequently asked questions</p>
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
            <Link href="/admin/faqs/new">
              <Button size="default" className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                New FAQ
              </Button>
            </Link>
          </div>
        </div>

        {faqs.length > 0 && (
          <div className="mb-4 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search FAQs..."
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
              {selectedIds.size === faqs.length ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
        )}

        <div className="grid gap-4">
          {filteredFaqs.map((faq) => (
            <Card key={faq.id} className={selectedIds.has(faq.id) ? 'ring-2 ring-blue-500' : ''}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(faq.id)}
                      onChange={() => toggleSelect(faq.id)}
                      className="mt-1 w-4 h-4 rounded border-gray-300"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-base sm:text-lg">{faq.question}</CardTitle>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:flex-row flex-col">
                    <Link href={`/admin/faqs/${faq.id}`} className="w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">Edit</Button>
                    </Link>
                    <button
                      onClick={() => openDeleteDialog(faq.id)}
                      disabled={deleting === faq.id}
                      className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    >
                      {deleting === faq.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}

          {loading ? (
            <Card>
              <CardContent className="py-12 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </CardContent>
            </Card>
          ) : filteredFaqs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-600">
                {searchQuery ? 'No FAQs match your search.' : 'No FAQs yet. Add your first FAQ to get started.'}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </main>
      
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete FAQ"
        description="Are you sure you want to delete this FAQ? This action cannot be undone."
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
      
      <ConfirmDialog
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        title="Delete Selected FAQs"
        description={`Are you sure you want to delete ${selectedIds.size} FAQ(s)? This action cannot be undone.`}
        onConfirm={handleBulkDelete}
        confirmText="Delete All"
        cancelText="Cancel"
      />
    </div>
  )
}
