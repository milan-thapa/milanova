import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/AdminSidebar"
import ProjectForm from "@/components/admin/ProjectForm"

export default async function NewProjectPage() {
  const session = await auth()
  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Project</h1>
          <p className="text-gray-600 mt-2">Add a new project to your portfolio</p>
        </div>
        <ProjectForm />
      </main>
    </div>
  )
}
