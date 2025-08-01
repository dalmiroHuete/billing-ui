'use client';

import { Box, Container, Heading, Text, VStack, HStack, Card, CardBody, SimpleGrid, Button, useColorModeValue, useToast, Spinner, Center, Skeleton } from '@chakra-ui/react';
import { useAuth } from '@/app/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Metrics } from './components/metrics';
import { useCreateProject } from '@/app/hooks/project-api/mutations/use-create-project';
import { CreateProjectDto } from '@/app/utils/types/project.type';

export default function DashboardPage() {
    const { user, logout, isLoading } = useAuth();
    const router = useRouter();
    const toast = useToast();
    const bgColor = useColorModeValue('white', 'gray.800');
    const cardBg = useColorModeValue('white', 'gray.700');
    const createProjectMutation = useCreateProject();


    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const handleCreateProject = async () => {
        if (!user?.companyId) {
            return;
        }

        const projectData: CreateProjectDto = {
            companyId: user.companyId,
            title: 'New Project',
            description: 'This is a new project created from the dashboard'
        };

        createProjectMutation.mutate(projectData, {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Project created successfully!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            },
            onError: (error) => {
                toast({
                    title: 'Error',
                    description: error instanceof Error ? error.message : 'Failed to create project',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            },
        });
    };

    if (isLoading) {
        return (
            <Box bg={bgColor} minH="100vh" py={8}>
                <Container maxW="container.xl">
                    <VStack spacing={8} align="stretch">
                        <HStack justify="space-between" align="start">
                            <Box>
                                <Skeleton height="40px" width="300px" mb={2} />
                                <Skeleton height="20px" width="400px" />
                            </Box>
                            <Skeleton height="40px" width="80px" />
                        </HStack>
                    </VStack>
                </Container>
            </Box>
        );
    }

    // Redirect if not authenticated
    if (!user) {
        return null;
    }

    return (
        <Box bg={bgColor} minH="100vh" py={8}>
            <Container maxW="container.xl">
                <VStack spacing={8} align="stretch">
                    <HStack justify="space-between" align="start">
                        <Box>
                            <Heading size="xl" color="gray.900" fontWeight="bold">
                                Welcome back, {user?.firstName} {user?.lastName}!
                            </Heading>
                            <Text color="gray.500" fontSize="md" mt={2}>
                                Here's what's happening with your company today
                            </Text>
                        </Box>
                        <Button
                            variant="outline"
                            colorScheme="red"
                            size="md"
                            onClick={handleLogout}
                            _hover={{ bg: 'red.50' }}
                        >
                            Logout
                        </Button>
                    </HStack>

                    <Metrics companyId={user.companyId || ''} />

                    <Card bg={cardBg} shadow="sm" borderRadius="lg">
                        <CardBody>
                            <VStack spacing={4} align="stretch">
                                <Heading size="md" color="gray.900">Quick Actions</Heading>
                                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                                    <Button
                                        variant="gradient"
                                        size="lg"
                                        borderRadius="lg"
                                        py={6}
                                        fontSize="md"
                                        fontWeight="medium"
                                        onClick={handleCreateProject}
                                        isLoading={createProjectMutation.isPending}
                                        loadingText="Creating..."
                                    >
                                        Simulate Create New Project
                                    </Button>
                                </SimpleGrid>
                            </VStack>
                        </CardBody>
                    </Card>

                </VStack>
            </Container>
        </Box>
    );
}
