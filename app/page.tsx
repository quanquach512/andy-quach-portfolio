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
  TechStackResponse,
  achievementsData,
  certificationsData,
  contactData,
  HeroData,
  Project,
  heroData,
  Achievement
} from "@/lib/data"
import { HeroAPI  } from "@/api/hero"
import { getProjects } from "@/api/projects"
import { getExpertise  } from "@/api/expertise"
import { getAchievements  } from "@/api/achievements"
import { getCertifications } from "@/api/certifications"

export default async function Home() {
  let hero = null
  let projects = []
  let techStack = null
  let achievements = null
  let certificationData = null 

  try {
    hero = await HeroAPI.get()
    projects = await getProjects() 
    techStack = await getExpertise() as TechStackResponse
    achievements = await getAchievements() 
    certificationData = await getCertifications()
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
      <TechStack data={techStack.expertise} />
      <Achievements 
        data={achievements.milestones} 
        limit={3}
        showViewAll={false}
      />
      <Certifications 
        data={certificationData.certifications} 
        limit={3}
        showViewAll={true}
      />
      <Contact data={contactData} />
      <Footer />
    </main>
  )
}
