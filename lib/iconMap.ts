import {
  GraduationCap,
  Award,
  Briefcase,
  Rocket,
  Heart,
  type LucideIcon,
} from "lucide-react"

export const iconMap = {
  GraduationCap,
  Award,
  Briefcase,
  Rocket,
  Heart,
} as const

export type IconName = keyof typeof iconMap