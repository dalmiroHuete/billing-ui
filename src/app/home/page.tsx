'use client';

import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { useAuth } from '@/app/hooks/use-auth';
import { useOnboardingRedirect } from '@/app/hooks/use-onboarding-redirect';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
    const { user, isLoading } = useAuth();
    const { needsOnboarding } = useOnboardingRedirect();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user) {
            if (needsOnboarding) {
                router.push('/onboarding');
            } else {
                router.push('/dashboard');
            }
        }
    }, [user, isLoading, needsOnboarding, router]);

    if (isLoading) {
        return (
            <Container maxW="container.xl" py={8}>
                <Text>Loading...</Text>
            </Container>
        );
    }

    if (!user) {
        router.push('/');
        return null;
    }

    if (needsOnboarding) {
        return (
            <Container maxW="container.xl" py={8}>
                <Text>Redirecting to onboarding...</Text>
            </Container>
        );
    }

    return (
        <Box bg="white" minH="100vh" py={8}>
            <Container maxW="container.xl">
                <VStack spacing={8} align="stretch">
                    <Box>
                        <Heading size="xl" color="gray.900" fontWeight="bold">
                            Welcome, {user.firstName} {user.lastName}!
                        </Heading>
                        <Text color="gray.500" fontSize="md" mt={2}>
                            You are logged in successfully.
                        </Text>
                    </Box>

                    <Box>
                        <Text color="gray.700" fontSize="lg">
                            User ID: {user.id}
                        </Text>
                        <Text color="gray.700" fontSize="lg">
                            Email: {user.email}
                        </Text>
                        <Text color="gray.700" fontSize="lg">
                            Role: {user.role}
                        </Text>
                        {user.companyId && (
                            <Text color="gray.700" fontSize="lg">
                                Company ID: {user.companyId}
                            </Text>
                        )}
                    </Box>

                    <Button
                        variant="gradient"
                        size="lg"
                        borderRadius="lg"
                        onClick={() => router.push('/dashboard')}
                    >
                        Go to Dashboard
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
}
