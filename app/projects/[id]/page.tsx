import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  Layers,
  Lightbulb,
  Target,
  BarChart3
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProjectById } from "@/api/projects"
import { asset } from "@/lib/assets"

interface ProjectPageProps {
  params: Promise<{ id: string }>
}


export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const numericId = Number(id)
 
  
  const project = await getProjectById(numericId) 
  console.log("PARSED ID:", project)
  if (!project) {
    notFound()
  }
  const screenshots = project?.details.screenshots ?? []
  const techStack = project?.techStack ?? []
  const architecture = project?.details.architecture ?? []
  const results = project?.details.results ?? []

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Back button */}
        <Button variant="outline" asChild className="mb-8">
          <Link href="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline">
              {project.category}
            </Badge>

            <Badge
              variant="secondary"
              className={
                project.status === "Completed"
                  ? "bg-green-500/10 text-green-400"
                  : project.status === "In Progress"
                  ? "bg-yellow-500/10 text-yellow-400"
                  : "bg-muted text-muted-foreground"
              }
            >
              {project.status}
            </Badge>
          </div>

          <h1 className="text-4xl font-bold mb-4">
            {project.title}
          </h1>

          <p className="text-muted-foreground text-lg">
            {project.description}
          </p>
        </header>

        {/* Screenshots */}
        {screenshots.length > 0 && (
          <section className="mb-12">
            <div className="grid gap-4">
              {screenshots.map((img: string, i: number) => (
                <div key={i} className="relative aspect-video">
                  <Image
                    src={asset(img)}
                    alt={`Screenshot ${i + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t: string) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
        </section>

        {/* Problem */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Problem</CardTitle>
          </CardHeader>
          <CardContent>
            {project.details.problem}
          </CardContent>
        </Card>

        {/* Solution */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Solution</CardTitle>
          </CardHeader>
          <CardContent>
            {project.details.solution}
          </CardContent>
        </Card>

        {/* Architecture */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {architecture.map((a: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1" />
                  {a}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.map((r: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-1" />
                  {r}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex justify-between border-t pt-6">
          <Button variant="outline" asChild>
            <Link href="/projects">Back to Projects</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/#contact">Contact</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}