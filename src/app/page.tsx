'use client';

import { Box, Heading, Link, Text, Flex, VStack, HStack, Spinner, Center } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from './hooks/auth-api/mutations/use-login';
import Form from './components/form/form';
import Feedback from './components/feedback/feedback';
import { useAuth } from './hooks/use-auth';
import { loginFields } from './utils/constants/constants';
import Banner from './components/banner/banner';
import { useOnboardingRedirect } from './hooks/use-onboarding-redirect';

export default function LoginPage() {
    const { login, user, isLoading } = useAuth();
    const router = useRouter();
    const [formError, setFormError] = useState("");
    const loginMutation = useLogin();
    const { needsOnboarding } = useOnboardingRedirect();

    useEffect(() => {
        if (!isLoading && user && !needsOnboarding) {
            router.replace("/dashboard");
        }
    }, [user, needsOnboarding, isLoading, router]);

    // Show loading spinner while authentication is being checked
    if (isLoading) {
        return (
            <Flex minH="100vh" alignItems="center" justifyContent="center">
                <Center>
                    <VStack spacing={4}>
                        <Spinner size="xl" color="brand.primary" />
                        <Text color="gray.500">Loading...</Text>
                    </VStack>
                </Center>
            </Flex>
        );
    }

    if (user && !needsOnboarding) return null;

    const onSubmit = (values: Record<string, unknown>) => {
        setFormError("");
        loginMutation.mutate(values as { email: string; password: string }, {
            onSuccess: (data) => {
                login(data);
            },
            onError: (error: unknown) => {
                setFormError(error instanceof Error ? error.message : "Login failed");
            },
        });
    };

    return (
        <Flex minH="100vh">
            <Box
                flex="1"
                bg="white"
                p={12}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >

                {/* Left panel - login form */}
                <Box w="full" maxW="md">
                    <VStack spacing={6} mb={8} align="flex-start">
                        <HStack spacing={3}>
                            <Text color="gray.400" fontSize="sm" fontWeight="medium">
                                Able Hiring
                            </Text>
                        </HStack>
                        <VStack spacing={2} align="flex-start">
                            <Heading size="xl" color="gray.900" fontWeight="bold">
                                Get Started
                            </Heading>
                            <Text color="gray.500" fontSize="md">
                                Welcome to Able Hiring - Let&#39;s create your account
                            </Text>
                        </VStack>
                    </VStack>

                    <Feedback message={formError} type="error"/>
                    <Form
                        formDefinition={loginFields}
                        type="login"
                        onSubmitCallback={onSubmit}
                        submitText="Sign up"
                    />

                    <Text textAlign="center" color="gray.500" mt={6}>
                        Already have an account?{' '}
                        <Link as={NextLink} href="/signup" color="gray.900" fontWeight="bold">
                            Log in
                        </Link>
                    </Text>
                </Box>
            </Box>

            <Banner imageSrc="/images/banner-login.jpg" />
        </Flex>
    );
}
