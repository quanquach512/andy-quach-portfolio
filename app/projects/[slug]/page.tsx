import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Github, ExternalLink, CheckCircle2, Layers, Lightbulb, Target, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/data"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  
  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back button */}
        <Button 
          variant="outline" 
          asChild 
          className="mb-8 border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
        >
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge 
              variant="outline" 
              className="text-sm font-mono border-primary/30 text-primary"
            >
              {project.category}
            </Badge>
            <Badge 
              variant="secondary"
              className={`text-sm font-mono ${
                project.status === "Completed" 
                  ? "bg-green-500/10 text-green-400" 
                  : project.status === "In Progress"
                  ? "bg-yellow-500/10 text-yellow-400"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {project.status}
            </Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            {project.title}
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            {project.github && (
              <Button 
                variant="outline" 
                asChild 
                className="border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Source
                </a>
              </Button>
            )}
            {project.live && (
              <Button 
                asChild 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a 
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </header>

        {/* Screenshots */}
        {project.screenshots.length > 0 && (
          <section className="mb-12">
            <div className="grid gap-4">
              {project.screenshots.map((screenshot, index) => (
                <div 
                  key={index} 
                  className="relative aspect-video rounded-lg overflow-hidden border border-border"
                >
                  <Image
                    src={screenshot}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech Stack */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Tech Stack</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="bg-secondary text-secondary-foreground text-sm font-mono px-3 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </section>

        {/* Problem Statement */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Target className="h-5 w-5 text-primary" />
              Problem Statement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {project.problem}
            </p>
          </CardContent>
        </Card>

        {/* Solution Overview */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Lightbulb className="h-5 w-5 text-primary" />
              Solution Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {project.solution}
            </p>
          </CardContent>
        </Card>

        {/* Architecture */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Layers className="h-5 w-5 text-primary" />
              Architecture & Data Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {project.architecture.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Results & Impact */}
        <Card className="bg-card border-border mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BarChart3 className="h-5 w-5 text-primary" />
              Results & Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {project.results.map((result, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">{result}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Footer navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button 
            variant="outline" 
            asChild 
            className="border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Projects
            </Link>
          </Button>
          <Button 
            variant="outline" 
            asChild 
            className="border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <Link href="/#contact">
              Get in Touch
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
