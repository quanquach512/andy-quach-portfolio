"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, X, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAdmin, type AdminEntity } from "@/components/admin/admin-provider"
import { EntityFormDialog, type FieldConfig } from "@/components/admin/entity-form-dialog"
import { projectCategories, achievementCategories } from "@/lib/data"

const projectFields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", required: true, placeholder: "my-project" },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "category", label: "Category", type: "select", options: projectCategories as unknown as string[] },
  { name: "status", label: "Status", type: "select", options: ["Completed", "In Progress", "Planned"] },
  { name: "tags", label: "Tags", type: "tags" },
  { name: "github", label: "GitHub URL", type: "text" },
  { name: "live", label: "Live URL", type: "text" },
]

const certificationFields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "issuer", label: "Issuer", type: "text", required: true },
  { name: "date", label: "Date", type: "text", placeholder: "2025" },
  { name: "status", label: "Status", type: "select", options: ["Completed", "In Progress", "Planned"] },
  { name: "credentialUrl", label: "Credential URL", type: "text" },
]

const achievementFields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "category", label: "Category", type: "select", options: achievementCategories as unknown as string[] },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "date", label: "Date", type: "text", placeholder: "2025" },
  { name: "link", label: "Link URL", type: "text" },
]

const techStackFields: FieldConfig[] = [
  { name: "category", label: "Category", type: "text", required: true, placeholder: "Frontend" },
  { name: "items", label: "Technologies", type: "tags" },
]

const fieldMap: Record<AdminEntity, FieldConfig[]> = {
  projects: projectFields,
  certifications: certificationFields,
  achievements: achievementFields,
  techStack: techStackFields,
}

const singularLabel: Record<AdminEntity, string> = {
  projects: "Project",
  certifications: "Certification",
  achievements: "Achievement",
  techStack: "Tech Group",
}

interface EditState {
  entity: AdminEntity
  id: string | null // null = add mode
  values?: Record<string, unknown>
}

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "Completed"
      ? "default"
      : status === "In Progress"
        ? "secondary"
        : "outline"
  return <Badge variant={variant}>{status}</Badge>
}

export function AdminDashboard() {
  const {
    isAuthenticated,
    isDashboardOpen,
    closeDashboard,
    logout,
    data,
    addItem,
    updateItem,
    deleteItem,
  } = useAdmin()

  const [edit, setEdit] = useState<EditState | null>(null)
  const [pendingDelete, setPendingDelete] = useState<{ entity: AdminEntity; id: string } | null>(null)

  if (!isAuthenticated || !isDashboardOpen) return null

  const openAdd = (entity: AdminEntity) => setEdit({ entity, id: null })
  const openEdit = (entity: AdminEntity, id: string, values: Record<string, unknown>) =>
    setEdit({ entity, id, values })

  const handleSubmit = (values: Record<string, unknown>) => {
    if (!edit) return
    if (edit.id) {
      updateItem(edit.entity, edit.id, values)
    } else {
      addItem(edit.entity, values)
    }
  }

  const confirmDelete = () => {
    if (pendingDelete) {
      deleteItem(pendingDelete.entity, pendingDelete.id)
      setPendingDelete(null)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={closeDashboard}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative flex h-full w-full max-w-5xl flex-col overflow-hidden border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-200 sm:h-[85vh] sm:rounded-xl">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <LayoutDashboard className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-foreground">Content Dashboard</h2>
              <p className="text-xs text-muted-foreground">Manage your portfolio content</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="mr-1.5 h-4 w-4" />
              Logout
            </Button>
            <Button variant="ghost" size="icon" onClick={closeDashboard} aria-label="Close dashboard">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Tabs */}
        <Tabs defaultValue="projects" className="flex flex-1 flex-col overflow-hidden">
          <div className="border-b border-border px-5 pt-3">
            <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="techStack">Tech Stack</TabsTrigger>
            </TabsList>
          </div>

          {/* Projects */}
          <TabsContent value="projects" className="flex-1 overflow-y-auto p-5">
            <TabToolbar
              title={`${data.projects.length} Projects`}
              onAdd={() => openAdd("projects")}
              addLabel="Add Project"
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden lg:table-cell">Tags</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.projects.map((p) => (
                  <TableRow key={p.__id}>
                    <TableCell>
                      <div className="font-medium text-foreground">{p.title}</div>
                      <div className="line-clamp-1 max-w-xs text-xs text-muted-foreground">
                        {p.description}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{p.category}</Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {p.tags?.slice(0, 3).map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={p.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <RowActions
                        onEdit={() => openEdit("projects", p.__id, p)}
                        onDelete={() => setPendingDelete({ entity: "projects", id: p.__id })}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Certifications */}
          <TabsContent value="certifications" className="flex-1 overflow-y-auto p-5">
            <TabToolbar
              title={`${data.certifications.length} Certifications`}
              onAdd={() => openAdd("certifications")}
              addLabel="Add Certification"
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Issuer</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.certifications.map((c) => (
                  <TableRow key={c.__id}>
                    <TableCell className="font-medium text-foreground">{c.name}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {c.issuer}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {c.date}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={c.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <RowActions
                        onEdit={() => openEdit("certifications", c.__id, c)}
                        onDelete={() => setPendingDelete({ entity: "certifications", id: c.__id })}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements" className="flex-1 overflow-y-auto p-5">
            <TabToolbar
              title={`${data.achievements.length} Achievements`}
              onAdd={() => openAdd("achievements")}
              addLabel="Add Achievement"
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.achievements.map((a) => (
                  <TableRow key={a.__id}>
                    <TableCell>
                      <div className="font-medium text-foreground">{a.title}</div>
                      <div className="line-clamp-1 max-w-xs text-xs text-muted-foreground">
                        {a.description}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{a.category}</Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {a.date}
                    </TableCell>
                    <TableCell className="text-right">
                      <RowActions
                        onEdit={() => openEdit("achievements", a.__id, a)}
                        onDelete={() => setPendingDelete({ entity: "achievements", id: a.__id })}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Tech Stack */}
          <TabsContent value="techStack" className="flex-1 overflow-y-auto p-5">
            <TabToolbar
              title={`${data.techStack.length} Tech Groups`}
              onAdd={() => openAdd("techStack")}
              addLabel="Add Group"
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Technologies</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.techStack.map((g) => (
                  <TableRow key={g.__id}>
                    <TableCell className="font-medium text-foreground">{g.category}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {g.items?.map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <RowActions
                        onEdit={() => openEdit("techStack", g.__id, g)}
                        onDelete={() => setPendingDelete({ entity: "techStack", id: g.__id })}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit form */}
      {edit && (
        <EntityFormDialog
          open={!!edit}
          onClose={() => setEdit(null)}
          title={`${edit.id ? "Edit" : "Add"} ${singularLabel[edit.entity]}`}
          fields={fieldMap[edit.entity]}
          initialValues={edit.values}
          onSubmit={handleSubmit}
        />
      )}

      {/* Delete confirmation */}
      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => (o ? null : setPendingDelete(null))}>
        <AlertDialogContent className="z-[120]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this item?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The item will be removed from your content list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function TabToolbar({
  title,
  onAdd,
  addLabel,
}: {
  title: string
  onAdd: () => void
  addLabel: string
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <Button size="sm" onClick={onAdd}>
        <Plus className="mr-1.5 h-4 w-4" />
        {addLabel}
      </Button>
    </div>
  )
}

function RowActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit} aria-label="Edit">
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive hover:text-destructive"
        onClick={onDelete}
        aria-label="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
