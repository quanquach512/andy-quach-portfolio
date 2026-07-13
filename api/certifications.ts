import { API_BASE } from "@/api/config"
import { Certification } from "@/lib/data"

export async function getCertifications(): Promise<Certification[]> {
  const res = await fetch(`${API_BASE}certifications`, {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch certifications: ${res.status}`)
  }

  return res.json()
}