"use client";

import {Box, Heading, Link, Text, Flex, VStack, HStack, Spinner, Center} from "@chakra-ui/react";
import NextLink from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useSignup} from "@/app/hooks/auth-api/mutations/use-signup";
import Form from "@/app/components/form/form";
import Feedback from "@/app/components/feedback/feedback";
import {useAuth} from "@/app/hooks/use-auth";
import {signupFields} from "@/app/utils/constants/constants";
import Banner from "@/app/components/banner";
import {useOnboardingRedirect} from "@/app/hooks/use-onboarding-redirect";

export default function SignupPage() {
    const {login, user, isLoading} = useAuth();
    const router = useRouter();
    const [formError, setFormError] = useState("");
    const signupMutation = useSignup();
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
        signupMutation.mutate(values as { firstName: string; lastName: string; email: string; password: string }, {
            onSuccess: (data) => {
                login(data);
            },
            onError: (error: unknown) => {
                setFormError(error instanceof Error ? error.message : "Signup failed");
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

                {/* Left panel - signup form */}
                <Box w="full" maxW="md">
                    <VStack spacing={6} mb={8} align="flex-start">
                        <HStack spacing={3}>
                            <Text color="gray.400" fontSize="sm" fontWeight="medium">
                                Able Hiring
                            </Text>
                        </HStack>
                        <VStack spacing={2} align="flex-start">
                            <Heading size="xl" color="gray.900" fontWeight="bold">
                                Create Account
                            </Heading>
                            <Text color="gray.500" fontSize="md">
                                Join Able Hiring and start building your dream team
                            </Text>
                        </VStack>
                    </VStack>

                    <Feedback message={formError} type="error"/>
                    <Form
                        formDefinition={signupFields}
                        type="signup"
                        onSubmitCallback={onSubmit}
                        submitText="Create Account"
                    />

                    <Text textAlign="center" color="gray.500" mt={6}>
                        Already have an account?{' '}
                        <Link as={NextLink} href="/" color="gray.900" fontWeight="bold">
                            Sign in
                        </Link>
                    </Text>
                </Box>
            </Box>

            <Banner imageSrc="/images/banner-signup.jpg" />
        </Flex>
    );
}
