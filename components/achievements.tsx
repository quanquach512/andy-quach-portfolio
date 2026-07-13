import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Calendar, ArrowRight, Icon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Achievement } from "@/lib/data"
import { getLucideIcon } from "@/lib/utils"

interface AchievementsProps {
  data: Achievement[]
  badge?: string
  title?: string
  description?: string
  showViewAll?: boolean
  limit?: number
}

export function Achievements({ 
  data,
  badge = "Milestones",
  title = "Achievements",
  description = "Milestones that reflect my learning, growth, and professional journey.",
  showViewAll = true,
  limit,
}: AchievementsProps) {
  const displayedAchievements = limit ? data.slice(0, limit) : data

  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase">{badge}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {description}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {displayedAchievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} />
          ))}
        </div>

        {showViewAll && (
          <div className="flex justify-end mt-8">
            <Button variant="outline" asChild className="group border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary">
              <Link href="/achievements">
                View All Achievements
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

interface AchievementCardProps {
  achievement: Achievement
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const Icon =  getLucideIcon (achievement.icon)
  
  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={achievement.image}
          alt={achievement.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <Badge 
          variant="secondary" 
          className="absolute top-4 left-4 bg-primary/90 text-primary-foreground border-0 flex items-center gap-1.5"
        >
          <Icon className="h-3 w-3" />
          {achievement.category}
        </Badge>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors leading-tight">
            {achievement.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {achievement.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <Calendar className="h-3.5 w-3.5" />
            {achievement.date}
          </div>
          
          {achievement.link && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary h-8 px-3"
            >
              <a
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                View
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
