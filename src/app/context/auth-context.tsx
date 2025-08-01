import { createContext } from "react";
import { User } from "@/app/utils/types/user.type";

export interface AuthContextType {
    user: User | null;
    login: (data: { access_token: string; user: User }) => void;
    logout: () => void;
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


