"use client"

import { useEffect, useState, type FormEvent } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type FieldType = "text" | "textarea" | "tags" | "select"

export interface FieldConfig {
  name: string
  label: string
  type: FieldType
  options?: string[]
  placeholder?: string
  required?: boolean
}

interface EntityFormDialogProps {
  open: boolean
  onClose: () => void
  title: string
  fields: FieldConfig[]
  initialValues?: Record<string, unknown>
  onSubmit: (values: Record<string, unknown>) => void
}

function toInputValue(field: FieldConfig, raw: unknown): string {
  if (field.type === "tags" && Array.isArray(raw)) {
    return raw.join(", ")
  }
  return raw === undefined || raw === null ? "" : String(raw)
}

export function EntityFormDialog({
  open,
  onClose,
  title,
  fields,
  initialValues,
  onSubmit,
}: EntityFormDialogProps) {
  const [values, setValues] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!open) return
    const next: Record<string, string> = {}
    for (const field of fields) {
      next[field.name] = toInputValue(field, initialValues?.[field.name])
    }
    setValues(next)
  }, [open, fields, initialValues])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const output: Record<string, unknown> = {}
    for (const field of fields) {
      const value = values[field.name] ?? ""
      if (field.type === "tags") {
        output[field.name] = value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
      } else {
        output[field.name] = value.trim()
      }
    }
    onSubmit(output)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? null : onClose())}>
      <DialogContent className="z-[120] max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={`field-${field.name}`}>{field.label}</Label>

              {field.type === "textarea" ? (
                <Textarea
                  id={`field-${field.name}`}
                  value={values[field.name] ?? ""}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [field.name]: e.target.value }))
                  }
                  placeholder={field.placeholder}
                  rows={3}
                  required={field.required}
                />
              ) : field.type === "select" ? (
                <Select
                  value={values[field.name] ?? ""}
                  onValueChange={(v) =>
                    setValues((prev) => ({ ...prev, [field.name]: v }))
                  }
                >
                  <SelectTrigger id={`field-${field.name}`}>
                    <SelectValue placeholder={field.placeholder ?? "Select..."} />
                  </SelectTrigger>
                  <SelectContent className="z-[130]">
                    {field.options?.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={`field-${field.name}`}
                  value={values[field.name] ?? ""}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [field.name]: e.target.value }))
                  }
                  placeholder={
                    field.placeholder ??
                    (field.type === "tags" ? "Comma, separated, values" : undefined)
                  }
                  required={field.required}
                />
              )}
            </div>
          ))}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
