"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { NavbarData } from "@/lib/data"

interface NavigationProps {
  data: NavbarData
}

export function Navigation({ data }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const sectionIds = data.links.map(link => link.href.replace("#", ""))
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0
      }
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [data.links])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-bold text-xl text-foreground hover:text-primary transition-colors">
          {data.logo}<span className="text-primary">{data.logoAccent}</span>
        </a>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          {data.links.map((link) => {
            const isActive = activeSection === link.href.replace("#", "")
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition-all duration-300 relative ${
                  isActive 
                    ? "text-primary font-medium" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full animate-in fade-in slide-in-from-left-2 duration-300" />
                )}
              </a>
            )
          })}
          <Button size="sm" asChild>
            <a href={data.ctaHref}>{data.ctaLabel}</a>
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>
      
      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-background">
          <div className="px-6 py-4 space-y-4">
            {data.links.map((link) => {
              const isActive = activeSection === link.href.replace("#", "")
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`block transition-colors ${
                    isActive 
                      ? "text-primary font-medium" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              )
            })}
            <Button className="w-full" onClick={() => setIsOpen(false)} asChild>
              <a href={data.ctaHref}>{data.ctaLabel}</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
