export const dynamic = "force-dynamic"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { TechStack } from "@/components/tech-stack"
import { Achievements } from "@/components/achievements"
import { Certifications } from "@/components/certifications"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import {
  navbarData,
  projectsData,
  techStackData,
  achievementsData,
  certificationsData,
  contactData,
  HeroData,
  Project,
  heroData
} from "@/lib/data"
import { HeroAPI  } from "@/api/hero"
import { getProjects } from "@/api/projects"

export default async function Home() {
  let hero = null
  let projects = []

  try {
    hero = await HeroAPI.get()
    projects = await getProjects() 
  } catch (err) {
    console.error("SSR error:", err)
  }
  return (
    <main>
      <Navigation data={navbarData} />
      <Hero data={hero ?? heroData} />
      <Projects 
        data={projects ?? []} 
        limit={3}
        showViewAll={false}
      />
      <TechStack data={techStackData} />
      <Achievements 
        data={achievementsData} 
        limit={3}
        showViewAll={true}
      />
      <Certifications 
        data={certificationsData} 
        limit={3}
        showViewAll={true}
      />
      <Contact data={contactData} />
      <Footer />
    </main>
  )
}
