'use client'

import { useState, useCallback } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import NextImage from 'next/image'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  label?: string
  folder?: string
  className?: string
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  label = 'Image',
  folder = 'uploads',
  className = '',
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      await uploadImage(file)
    } else {
      setError('Please drop an image file')
    }
  }, [])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await uploadImage(file)
    }
  }

  const uploadImage = async (file: File) => {
    setIsUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image')
      }

      onChange(data.url)
    } catch (error) {
      console.error('Error uploading image:', error)
      setError('Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    onChange('')
    onRemove?.()
  }

  if (value) {
    return (
      <Card className={`relative overflow-hidden ${className}`}>
        <div className="relative aspect-video">
          <NextImage
            src={value}
            alt={`${label} preview`}
            fill
            className="object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className={`border-2 border-dashed transition-all hover:border-gray-400 ${
        isDragging ? 'border-brand-dark bg-brand-dark/5' : 'border-gray-300'
      } ${isUploading ? 'opacity-50 pointer-events-none' : ''} ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 min-h-[200px] sm:min-h-[240px] space-y-4">
        {isUploading ? (
          <div className="flex flex-col items-center space-y-3">
            <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-brand-dark" />
            <p className="text-sm text-gray-600 font-medium">Uploading...</p>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id={`upload-${label}`}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById(`upload-${label}`)?.click()}
              className="px-6"
            >
              Choose File
            </Button>
          </>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600 text-center">{error}</p>
          </div>
        )}
      </div>
    </Card>
  )
}
