import { CreateProjectDto, ProjectResponse } from '@/app/utils/types/project.type';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export class ProjectService {
    static async createProject(projectData: CreateProjectDto): Promise<ProjectResponse> {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create project');
        }

        return response.json();
    }
}
