import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { TechStack } from "@/components/tech-stack"
import { Achievements } from "@/components/achievements"
import { Certifications } from "@/components/certifications"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import {
  heroData,
  navbarData,
  projectsData,
  techStackData,
  achievementsData,
  certificationsData,
  contactData,
} from "@/lib/data"

export default function Home() {
  return (
    <main>
      <Navigation data={navbarData} />
      <Hero data={heroData} />
      <Projects 
        data={projectsData} 
        limit={3}
        showViewAll={true}
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
