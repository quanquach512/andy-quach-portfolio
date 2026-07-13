import Link from "next/link"
import Image from "next/image"
import { Award, ExternalLink, ArrowRight, Clock, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Certification } from "@/lib/data"
import { asset } from "@/lib/assets"

interface CertificationsProps {
  data: Certification[]
  badge?: string
  title?: string
  description?: string
  showViewAll?: boolean
  limit?: number
}

export function Certifications({ 
  data,
  badge = "Credentials",
  title = "Certifications",
  description = "Professional certifications validating my expertise.",
  showViewAll = true,
  limit,
}: CertificationsProps) {
  const displayedCerts = limit ? data.slice(0, limit) : data

  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase">{badge}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {description}
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCerts.map((cert, index) => (
            <CertificationCard key={index} certification={cert} />
          ))}
        </div>

        {showViewAll && (
          <div className="flex justify-end mt-8">
            <Button variant="outline" asChild className="group border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary">
              <Link href="/certifications">
                View All Certifications
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

interface CertificationCardProps {
  certification: Certification
}

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-colors group overflow-hidden">
      {certification.badgeImage && (
        <div className="relative h-32 overflow-hidden">
          <Image
            src={asset(certification.badgeImage)}
            alt={certification.name}
            fill
            className="object-contain scale-100 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        </div>
      )}
      <CardContent className={certification.badgeImage ? "p-6" : "p-6"}>
        <div className="flex items-start gap-4">
          {!certification.badgeImage && (
            <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
              <Award className="h-6 w-6" />
            </div>
          )}
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                {certification.name}
              </h3>
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                aria-label={`View ${certification.name} credential`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              {certification.issuer}
            </p>
            <div className="flex items-center gap-3">
              <Badge 
                variant="secondary"
                className={`text-xs font-mono ${
                  certification.status === "Completed" 
                    ? "bg-green-500/10 text-green-400" 
                    : certification.status === "In Progress"
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {certification.status === "In Progress" && <Clock className="h-3 w-3 mr-1" />}
                {certification.status === "Completed" && <Award className="h-3 w-3 mr-1" />}
                {certification.status === "Planned" && <Calendar className="h-3 w-3 mr-1" />}
                {certification.status}
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">
                {certification.date}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
