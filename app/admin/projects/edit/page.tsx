import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/AdminSidebar"
import { prisma } from "@/lib/prisma"
import ProjectForm from "@/components/admin/ProjectForm"

async function getProject(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
  })
}

export default async function EditProjectPage({ searchParams }: { searchParams: { slug?: string } }) {
  const session = await auth()
  if (!session) {
    redirect("/admin/login")
  }

  const slug = searchParams.slug
  if (!slug) {
    redirect("/admin/projects")
  }

  const project = await getProject(slug)

  if (!project) {
    redirect("/admin/projects")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
          <p className="text-gray-600 mt-2">Update your project</p>
        </div>
        <ProjectForm project={project} />
      </main>
    </div>
  )
}
