import { API_BASE } from "@/api/config"
import { TechStackResponse } from "@/lib/data"

export async function getExpertise(): Promise<TechStackResponse> {
  const res = await fetch(`${API_BASE}expertise`, {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch expertise: ${res.status}`)
  }

  return res.json()
}