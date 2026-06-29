import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ProjectForm from "@/components/admin/ProjectForm"
import AdminSidebar from "@/components/admin/AdminSidebar"

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) {
    redirect("/admin/login")
  }

  const project = await prisma.project.findUnique({
    where: { id: params.id },
  })

  if (!project) {
    redirect("/admin/projects")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-8">
        <ProjectForm project={project} />
      </div>
    </div>
  )
}
