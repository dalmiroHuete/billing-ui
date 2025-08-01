import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectService } from '@/app/services/project.service';
import { CreateProjectDto } from '@/app/utils/types/project.type';

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (projectData: CreateProjectDto) => ProjectService.createProject(projectData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        },
        onError: (error) => {
            return error;
        },
    });
};
