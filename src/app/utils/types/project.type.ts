export interface CreateProjectDto {
    companyId: string;
    title: string;
    description?: string;
}

export interface ProjectResponse {
    id: string;
    title: string;
    description?: string;
    companyId: string;
    createdAt: string;
    updatedAt: string;
} 