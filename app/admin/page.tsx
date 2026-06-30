import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/AdminSidebar"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban, FileText, MessageSquare, Users, Building, UserCheck } from "lucide-react"
import DashboardCharts from "@/components/admin/DashboardCharts"

async function getStats() {
  const [projects, blogs, testimonials, faqs, contactSubmissions] = await Promise.all([
    prisma.project.count(),
    prisma.blog.count(),
    prisma.testimonial.count(),
    prisma.fAQ.count(),
    prisma.contactSubmission.count(),
  ])

  return { projects, blogs, testimonials, faqs, contactSubmissions, jobs: 0, applications: 0 }
}

async function getContentByCategory() {
  const projectsByCategory = await prisma.project.groupBy({
    by: ['category'],
    _count: true,
  })

  // Get blogs by category using the relation
  const blogsByCategory = await prisma.category.findMany({
    include: {
      _count: {
        select: { blogs: true }
      }
    }
  })

  // Filter out null categories and ensure name is string
  const projectChartData = projectsByCategory
    .filter(item => item.category !== null)
    .map(item => ({ name: item.category as string, count: item._count }))

  const blogChartData = blogsByCategory
    .filter(cat => cat._count.blogs > 0)
    .map(cat => ({ name: cat.name, count: cat._count.blogs }))

  return { projectChartData, blogChartData }
}

async function getRecentContent() {
  const [recentProjects, recentBlogs] = await Promise.all([
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, category: true, year: true, createdAt: true },
    }),
    prisma.blog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, excerpt: true, publishedAt: true, createdAt: true },
    }),
  ])

  return { recentProjects, recentBlogs }
}

export default async function AdminDashboard() {
  const session = await auth()
  if (!session) {
    redirect("/admin/login")
  }

  const stats = await getStats()
  const { projectChartData, blogChartData } = await getContentByCategory()
  const { recentProjects, recentBlogs } = await getRecentContent()

  const statCards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: FolderKanban,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/admin/projects",
    },
    {
      title: "Total Blogs",
      value: stats.blogs,
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/admin/blogs",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-0 lg:ml-64 xl:ml-72 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Welcome back, {session.user?.name || 'Admin'}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {statCards.map((card) => {
            const Icon = card.icon
            return (
              <Card key={card.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                    {card.title}
                  </CardTitle>
                  <div className={`p-1.5 sm:p-2 rounded-lg ${card.bgColor}`}>
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{card.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <DashboardCharts 
          projectChartData={projectChartData}
          blogChartData={blogChartData}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FolderKanban className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{project.title}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {recentProjects.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No projects yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Blogs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentBlogs.map((blog) => (
                  <div key={blog.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">{blog.title}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {recentBlogs.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No blogs yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
