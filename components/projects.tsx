"use client"

import Link from "next/link"
import { ExternalLink, Github, ArrowRight, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { Project } from "@/lib/data"

interface ProjectsProps {
  data: Project[]
  badge?: string
  title?: string
  description?: string
  showViewAll?: boolean
  limit?: number
}

export function Projects({ 
  data,
  badge = "Portfolio",
  title = "Featured Projects",
  description = "A selection of projects I've built, from open-source tools to full-stack applications.",
  showViewAll = true,
  limit,
}: ProjectsProps) {
  const displayedProjects = limit ? data.slice(0, limit) : data

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-mono text-sm tracking-wider uppercase">{badge}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {description}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {showViewAll && (
          <motion.div 
            className="flex justify-end mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button variant="outline" asChild className="group border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: Project
  index?: number
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card className="bg-card border-border group relative overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 active:shadow-lg active:shadow-primary/20 active:border-primary/60">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1.5">
              <CardTitle className="text-xl text-card-foreground group-hover:text-primary group-active:text-primary transition-colors">
                {project.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className="text-xs font-mono border-primary/30 text-primary"
                >
                  {project.category}
                </Badge>
                <Badge 
                  variant="secondary"
                  className={`text-xs font-mono ${
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
            </div>
          </div>
          <CardDescription className="text-muted-foreground leading-relaxed mt-2 line-clamp-3">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="bg-secondary text-secondary-foreground text-xs font-mono"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Action buttons - always visible on mobile, hover on desktop */}
          <div className="flex items-center gap-2 pt-2 opacity-100 md:opacity-0 translate-y-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-active:opacity-100 group-active:translate-y-0 transition-all duration-300">
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="flex-1 border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary active:bg-primary active:text-primary-foreground active:border-primary"
            >
              <Link href={`/projects/${project.slug}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </Button>
            {project.github && (
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                className="border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary active:bg-primary active:text-primary-foreground active:border-primary"
              >
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.live && (
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                className="border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary active:bg-primary active:text-primary-foreground active:border-primary"
              >
                <a 
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} live`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
