import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/app/services/auth.service';
import type { AuthResponse } from '@/app/utils/types/auth.type';

interface SignupInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const useSignup = () => {
  return useMutation<AuthResponse, Error, SignupInput>({
    mutationFn: ({ firstName, lastName, email, password }) =>
      AuthService.signup(firstName, lastName, email, password),
  });
}; 