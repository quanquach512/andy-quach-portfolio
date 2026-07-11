import { API_BASE } from "@/api/config"
import { Project } from "@/lib/data"

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}projects`, {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch projects: ${res.status}`)
  }

  return res.json()
}

export async function getProjectById(id: number): Promise<Project | null > {
  if (!Number.isFinite(id)) return null

  const res = await fetch(`${API_BASE}projects/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    return null
  }
  
  const data = await res.json()
  if (!data?.id) return null
  return data
}