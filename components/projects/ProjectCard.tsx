'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  project: {
    id: string
    slug: string
    title: string
    description: string
    tags: string[]
    coverImage: string
    mockupImage: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.mockupImage || project.coverImage

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/projects/${project.slug}`}>
        {/* Mockup */}
        <div className="aspect-[16/10] bg-gradient-to-br from-off-white to-cream rounded-2xl mb-4 overflow-hidden relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-[#F4F9F4] flex items-center justify-center text-text-muted">
              <svg className="w-24 h-24 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm-6-4h8v2h-8z" />
              </svg>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-text-dark font-bold text-xl mb-2 group-hover:text-teal transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-text-muted text-sm line-clamp-3 mb-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-white border border-[#E0E0E0] text-text-body text-xs rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  )
}
