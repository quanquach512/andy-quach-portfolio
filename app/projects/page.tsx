"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectCard } from "@/components/projects"
import { projectsData, projectCategories, type ProjectCategory } from "@/lib/data"

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All")

  const filteredProjects = activeCategory === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory)

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Button variant="outline" asChild className="mb-8 border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        {/* Header */}
        <div className="space-y-4 mb-12">
          <p className="text-primary font-mono text-sm tracking-wider uppercase">Portfolio</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">All Projects</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A comprehensive collection of my work spanning data engineering, analytics, 
            software development, and more. Each project represents a unique challenge 
            and learning opportunity.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          <Badge
            variant={activeCategory === "All" ? "default" : "outline"}
            className={`cursor-pointer px-4 py-2 text-sm transition-colors ${
              activeCategory === "All" 
                ? "bg-primary text-primary-foreground" 
                : "border-border hover:border-primary hover:text-primary"
            }`}
            onClick={() => setActiveCategory("All")}
          >
            All
          </Badge>
          {projectCategories.map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 text-sm transition-colors ${
                activeCategory === category 
                  ? "bg-primary text-primary-foreground" 
                  : "border-border hover:border-primary hover:text-primary"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No projects found in this category.</p>
          </div>
        )}
      </div>
    </main>
  )
}
