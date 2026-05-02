"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AchievementCard } from "@/components/achievements"
import { achievementsData, achievementCategories, type AchievementCategory } from "@/lib/data"

export default function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState<AchievementCategory | "All">("All")

  const filteredAchievements = activeCategory === "All" 
    ? achievementsData 
    : achievementsData.filter(achievement => achievement.category === activeCategory)

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
          <p className="text-primary font-mono text-sm tracking-wider uppercase">Milestones</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">All Achievements</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A timeline of significant milestones in my professional journey, from academic 
            accomplishments to career highlights. Each achievement represents dedication, 
            growth, and the pursuit of excellence.
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
          {achievementCategories.map((category) => (
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

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} />
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No achievements found in this category.</p>
          </div>
        )}
      </div>
    </main>
  )
}
