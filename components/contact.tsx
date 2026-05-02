"use client"

import { useState } from "react"
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import type { ContactData } from "@/lib/data"

interface ContactProps {
  data: ContactData
}

export function Contact({ data }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side - Contact info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-mono text-sm tracking-wider uppercase">{data.badge}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                {data.headline}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {data.description}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-foreground/80">
                <Mail className="h-5 w-5 text-primary" />
                <a 
                  href={`mailto:${data.email}`} 
                  className="hover:text-primary transition-colors"
                >
                  {data.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-foreground/80">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{data.location}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              {data.socials.github && (
                <a 
                  href={data.socials.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
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
                  className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {data.socials.twitter && (
                <a 
                  href={data.socials.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
          
          {/* Right side - Contact form */}
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="bg-input border-border"
                  />
                </Field>
                
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="bg-input border-border"
                  />
                </Field>
                
                <Field>
                  <FieldLabel htmlFor="subject">Subject</FieldLabel>
                  <Input 
                    id="subject"
                    name="subject"
                    placeholder="Project inquiry"
                    required
                    className="bg-input border-border"
                  />
                </Field>
                
                <Field>
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <Textarea 
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    className="bg-input border-border resize-none"
                  />
                </Field>
              </FieldGroup>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
