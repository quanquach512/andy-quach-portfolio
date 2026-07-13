import { API_BASE } from "@/api/config"
import { Achievement } from "@/lib/data"

export async function getAchievements(): Promise<Achievement[]> {
  const res = await fetch(`${API_BASE}milestones`, {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch achievements: ${res.status}`)
  }

  return res.json()
}