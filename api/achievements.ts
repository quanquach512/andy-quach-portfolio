import { API_BASE } from "@/api/config"
import { Achievement } from "@/lib/data"

export async function getExpertise(): Promise<Achievement[]> {
  const res = await fetch(`${API_BASE}achievements`, {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch achievements: ${res.status}`)
  }

  return res.json()
}