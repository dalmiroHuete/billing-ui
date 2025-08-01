"use client";

import React, { useEffect } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/use-auth';
import {onboardingSteps} from '@/app/utils/constants/constants';
import { OnboardingHeader, Wizard, PaymentDrawerWrapper } from './components';

export default function OnboardingPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log('user is : ', JSON.stringify(user, null, 2))
        if (user && user.companyId) {
            router.replace("/dashboard");
        }
    }, [user, router]);

    if (!user || user.companyId) return null;

    return (
        <Box
            minH="100vh"
            bg="white"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={8}
        >
            <Box w="full" maxW="2xl">
                <VStack spacing={6} mb={8} align="center">
                    <OnboardingHeader />
                </VStack>

                <Wizard steps={onboardingSteps} />
            </Box>

            <PaymentDrawerWrapper />
        </Box>
    );
}
