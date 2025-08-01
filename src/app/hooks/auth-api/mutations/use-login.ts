import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/app/services/auth.service';
import type { AuthResponse } from '@/app/utils/types/auth.type';

interface LoginInput {
  email: string;
  password: string;
}

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginInput>({
    mutationFn: ({ email, password }) => AuthService.login(email, password),
  });
}; 