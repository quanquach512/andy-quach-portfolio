"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CertificationCard } from "@/components/certifications"
import { type CertificationStatus } from "@/lib/data"
import { getCertifications } from "@/api/certifications"

const statusOptions: (CertificationStatus | "All")[] = ["All", "Completed", "In Progress", "Planned"]

export default function CertificationsPage() {
  const [activeStatus, setActiveStatus] = useState<CertificationStatus | "All">("All")
  const [certs, setCerts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCertifications() {
      try {
        setLoading(true)
        const data = await getCertifications()
        setCerts(data.certifications)
      } catch (error) {
        console.error("Failed to fetch certifications:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCertifications()
  }, [])

  const filteredCertifications = activeStatus === "All"
    ? certs
    : certs.filter(cert => cert.status === activeStatus)

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
          <p className="text-primary font-mono text-sm tracking-wider uppercase">Credentials</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">All Certifications</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Professional certifications that validate my expertise across cloud platforms, 
            data engineering, and modern software development practices. I believe in 
            continuous learning and staying current with industry standards.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {statusOptions.map((status) => (
            <Badge
              key={status}
              variant={activeStatus === status ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 text-sm transition-colors ${
                activeStatus === status 
                  ? "bg-primary text-primary-foreground" 
                  : "border-border hover:border-primary hover:text-primary"
              }`}
              onClick={() => setActiveStatus(status)}
            >
              {status}
            </Badge>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-muted-foreground">
              Loading certifications...
            </div>
          ) : (
            filteredCertifications.map((cert, index) => (
              <CertificationCard key={index} certification={cert} />
            ))
          )}
        </div>

        {filteredCertifications.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No certifications found with this status.</p>
          </div>
        )}
      </div>
    </main>
  )
}
