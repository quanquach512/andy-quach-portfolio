"use client";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProfileAvatar } from "@/components/profile-avatar"
import type { HeroData } from "@/lib/data"
import { asset } from "@/lib/assets"
import { DownloadAPI } from "@/lib/api/download"

interface HeroProps {
  data: HeroData
}

export function Hero({ data }: HeroProps) {
  return (
    <section className="flex items-center justify-center px-6 pt-24 pb-16">
      <div className="max-w-6xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1 space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-mono text-sm tracking-wider uppercase">
                {data.badge}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                {data.headline.line1}
                <br />
                <span className="text-primary">{data.headline.highlight}</span> {data.headline.line2}
              </h1>
            </div>
            
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              {data.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="group" asChild>
                <a href={data.primaryCta.href}>
                  {data.primaryCta.label}
                  <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              </Button>
              <Button variant="outline" size="lg" onClick={DownloadAPI.resume}>
                {data.secondaryCta.label}
              </Button>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              {data.socials.github && (
                <a 
                  href={data.socials.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {data.socials.linkedin && (
                <a 
                  href={data.socials.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {data.socials.email && (
                <a 
                  href={`mailto:${data.socials.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
          
          {/* Right image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <ProfileAvatar src={asset(data.avatarSrc)} alt={data.avatarAlt} />
          </div>
        </div>
      </div>
    </section>
  )
}
