import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { iconMap, type IconName } from "./iconMap"
import {
  GraduationCap,
  Award,
  Briefcase,
  Rocket,
  Heart,
  type LucideIcon,
} from "lucide-react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLucideIcon(name: string): LucideIcon {
  const Icon = iconMap[name as IconName]
  
  if (!Icon) {
    return Rocket
  }
  return Icon

}
