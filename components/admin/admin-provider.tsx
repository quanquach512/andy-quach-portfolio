"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  projectsData,
  certificationsData,
  achievementsData,
  // techStackData,
  type Project,
  type Certification,
  type Achievement,
} from "@/lib/data"

// Admin-specific record shapes (serializable, with stable ids).
export type AdminProject = Omit<Project, never> & { __id: string }
export type AdminCertification = Certification & { __id: string }
export type AdminAchievement = Omit<Achievement, "icon"> & { __id: string }
export type AdminTechGroup = { __id: string; category: string; items: string[] }

export type AdminEntity = "projects" | "certifications" | "achievements" | "techStack"

interface AdminData {
  projects: AdminProject[]
  certifications: AdminCertification[]
  achievements: AdminAchievement[]
  techStack: AdminTechGroup[]
}

interface AdminContextValue {
  // Auth
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  // UI state
  isLoginOpen: boolean
  openLogin: () => void
  closeLogin: () => void
  isDashboardOpen: boolean
  openDashboard: () => void
  closeDashboard: () => void
  // Data
  data: AdminData
  addItem: (entity: AdminEntity, item: Record<string, unknown>) => void
  updateItem: (entity: AdminEntity, id: string, item: Record<string, unknown>) => void
  deleteItem: (entity: AdminEntity, id: string) => void
}

const AdminContext = createContext<AdminContextValue | null>(null)

const AUTH_KEY = "portfolio_admin_auth"
const DATA_KEY = "portfolio_admin_data"

// Mock credentials (frontend-only demo auth).
const MOCK_USER = "admin"
const MOCK_PASS = "admin"

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2)
}

function seedData(): AdminData {
  return {
    projects: projectsData.map((p) => ({ ...p, __id: uid() })),
    certifications: certificationsData.map((c) => ({ ...c, __id: uid() })),
    achievements: achievementsData.map(({ icon, ...rest }) => ({ ...rest, __id: uid() })),
    // techStack: Object.entries(techStackData).map(([category, items]) => ({
    //   __id: uid(),
    //   category,
    //   items,
    // })),
  }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isDashboardOpen, setIsDashboardOpen] = useState(false)
  const [data, setData] = useState<AdminData>(() => seedData())
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      if (localStorage.getItem(AUTH_KEY) === "true") {
        setIsAuthenticated(true)
      }
      const savedData = localStorage.getItem(DATA_KEY)
      if (savedData) {
        setData(JSON.parse(savedData))
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true)
  }, [])

  // Persist data after hydration.
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(DATA_KEY, JSON.stringify(data))
    } catch {
      // ignore quota errors
    }
  }, [data, hydrated])

  const value = useMemo<AdminContextValue>(() => {
    const login = (username: string, password: string) => {
      const ok = username.trim() === MOCK_USER && password === MOCK_PASS
      if (ok) {
        setIsAuthenticated(true)
        try {
          localStorage.setItem(AUTH_KEY, "true")
        } catch {
          // ignore
        }
        setIsLoginOpen(false)
      }
      return ok
    }

    const logout = () => {
      setIsAuthenticated(false)
      setIsDashboardOpen(false)
      try {
        localStorage.removeItem(AUTH_KEY)
      } catch {
        // ignore
      }
    }

    const addItem: AdminContextValue["addItem"] = (entity, item) => {
      setData((prev) => ({
        ...prev,
        [entity]: [{ __id: uid(), ...item }, ...prev[entity]] as never,
      }))
    }

    const updateItem: AdminContextValue["updateItem"] = (entity, id, item) => {
      setData((prev) => ({
        ...prev,
        [entity]: prev[entity].map((row) =>
          row.__id === id ? { ...row, ...item } : row,
        ) as never,
      }))
    }

    const deleteItem: AdminContextValue["deleteItem"] = (entity, id) => {
      setData((prev) => ({
        ...prev,
        [entity]: prev[entity].filter((row) => row.__id !== id) as never,
      }))
    }

    return {
      isAuthenticated,
      login,
      logout,
      isLoginOpen,
      openLogin: () => setIsLoginOpen(true),
      closeLogin: () => setIsLoginOpen(false),
      isDashboardOpen,
      openDashboard: () => setIsDashboardOpen(true),
      closeDashboard: () => setIsDashboardOpen(false),
      data,
      addItem,
      updateItem,
      deleteItem,
    }
  }, [isAuthenticated, isLoginOpen, isDashboardOpen, data])

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return ctx
}
