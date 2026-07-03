"use client"

import { LogIn, Settings, LayoutDashboard, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAdmin } from "@/components/admin/admin-provider"

interface AdminControlsProps {
  /** Full-width layout for the mobile menu. */
  fullWidth?: boolean
  /** Called after an action is triggered (e.g. to close the mobile menu). */
  onAction?: () => void
}

export function AdminControls({ fullWidth, onAction }: AdminControlsProps) {
  const { isAuthenticated, openLogin, openDashboard, logout } = useAdmin()

  if (!isAuthenticated) {
    return (
      <Button
        variant="outline"
        size="sm"
        className={fullWidth ? "w-full" : undefined}
        onClick={() => {
          openLogin()
          onAction?.()
        }}
      >
        <LogIn className="mr-1.5 h-4 w-4" />
        Login
      </Button>
    )
  }

  if (fullWidth) {
    // Mobile: render explicit buttons instead of a dropdown.
    return (
      <div className="flex flex-col gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={() => {
            openDashboard()
            onAction?.()
          }}
        >
          <LayoutDashboard className="mr-1.5 h-4 w-4" />
          Admin Dashboard
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={() => {
            logout()
            onAction?.()
          }}
        >
          <LogOut className="mr-1.5 h-4 w-4" />
          Logout
        </Button>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="gap-1.5">
          <Settings className="h-4 w-4" />
          Admin
          <span className="ml-0.5 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Admin Mode</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={openDashboard}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Open Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
