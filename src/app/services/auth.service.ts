import { AuthResponse } from "@/app/utils/types/auth.type";
import { UserProfileResponse } from "@/app/utils/types/user.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export class AuthService {
    static async login(email: string, password: string): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return response.json();
    }

    static async signup(email: string, password: string, firstName: string, lastName: string): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, firstName, lastName }),
        });

        if (!response.ok) {
            throw new Error('Signup failed');
        }

        return response.json();
    }

    static async getUserProfile(): Promise<UserProfileResponse> {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URL}/users/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        return response.json();
    }
}


