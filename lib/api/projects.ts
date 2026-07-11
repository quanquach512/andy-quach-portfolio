import { request } from "./client"
import { Project } from "@/lib/data"

export const ProjectAPI = {
    // GET /projects (list)
    getAll: () => request<Project[]>("/projects"),
    // GET /projects/:id
    getById: (id: number) =>
    request<Project>(`/projects/${id}`),
}