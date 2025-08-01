'use client';

import {ReactNode, useState} from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import theme from "@/theme";
import { AuthProvider } from '@/app/context/auth-provider';
import { OnboardingProvider } from '@/app/context/onboarding-provider';

export function AppProviders({children}: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <OnboardingProvider>
                        {children}
                    </OnboardingProvider>
                </AuthProvider>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </ChakraProvider>
    );
}
