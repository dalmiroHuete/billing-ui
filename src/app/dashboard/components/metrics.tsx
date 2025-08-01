import React from 'react';
import { Card, CardBody, Stat, StatLabel, StatNumber, StatHelpText, SimpleGrid, useColorModeValue, Skeleton } from '@chakra-ui/react';
import { useDashboard } from '@/app/hooks/dashboard-api/queries/use-dashboard';
import { PlanType } from '@/app/utils/types/dashboard.type';
import Feedback from '@/app/components/feedback/feedback';

interface MetricsProps {
    companyId: string;
}

export const Metrics: React.FC<MetricsProps> = ({ companyId }) => {
    const { data: dashboardData, isLoading, error } = useDashboard(companyId);
    const cardBg = useColorModeValue('white', 'gray.700');

    if (isLoading) {
        return (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {[1, 2, 3].map((i) => (
                    <Card key={i} bg={cardBg} shadow="sm" borderRadius="lg">
                        <CardBody>
                            <Skeleton height="20px" mb={2} />
                            <Skeleton height="32px" mb={1} />
                            <Skeleton height="16px" width="60%" />
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        );
    }

    if (error) {
        return <Feedback message={error.message} type="error" />;
    }

    if (!dashboardData) {
        return null;
    }

    const { planType, credits, seats, projects } = dashboardData;

    const getPlanDisplayName = (planType: PlanType): string => {
        switch (planType) {
            case 'PAY_AS_YOU_GO':
                return 'Pay-as-you-go';
            case 'PREPAID':
                return 'Prepaid';
            case 'SEATS':
                return 'Seats';
            default:
                return planType;
        }
    };

    const getPlanMetric = (planType: string, credits: number, seats: number) => {
        switch (planType) {
            case 'PAY_AS_YOU_GO':
                return null;
            case 'PREPAID':
                return {
                    label: 'Credits Available',
                    value: credits,
                    helpText: `${credits} credits remaining`
                };
            case 'SEATS':
                return {
                    label: 'Active Seats',
                    value: seats,
                    helpText: `${(seats - 1)} available `
                };
            default:
                return null;
        }
    };

    const planMetric = getPlanMetric(planType.toUpperCase(), credits, seats);

    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <Card bg={cardBg} shadow="sm" borderRadius="lg">
                <CardBody>
                    <Stat>
                        <StatLabel color="gray.500" fontSize="sm">Current Plan</StatLabel>
                        <StatNumber color="brand.primary" fontSize="2xl" fontWeight="bold">
                            {getPlanDisplayName(planType)}
                        </StatNumber>
                        <StatHelpText color="brand.primary" fontSize="xs">Active</StatHelpText>
                    </Stat>
                </CardBody>
            </Card>


            {planMetric && (
                <Card bg={cardBg} shadow="sm" borderRadius="lg">
                    <CardBody>
                        <Stat>
                            <StatLabel color="gray.500" fontSize="sm">{planMetric.label}</StatLabel>
                            <StatNumber color="brand.primary" fontSize="2xl" fontWeight="bold">
                                {planMetric.value}
                            </StatNumber>
                            <StatHelpText color="brand.primary" fontSize="xs">{planMetric.helpText}</StatHelpText>
                        </Stat>
                    </CardBody>
                </Card>
            )}

            <Card bg={cardBg} shadow="sm" borderRadius="lg">
                <CardBody>
                    <Stat>
                        <StatLabel color="gray.500" fontSize="sm">Total Projects</StatLabel>
                        <StatNumber color="brand.primary" fontSize="2xl" fontWeight="bold">
                            {projects.length}
                        </StatNumber>
                        <StatHelpText color="brand.primary" fontSize="xs">
                            {projects.length > 0 ? 'Active projects' : 'No projects yet'}
                        </StatHelpText>
                    </Stat>
                </CardBody>
            </Card>
        </SimpleGrid>
    );
};
