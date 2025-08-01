import React from 'react';
import { VStack, HStack, Text, Heading } from '@chakra-ui/react';

const OnboardingHeader: React.FC = () => {
    return (
        <VStack spacing={2} align="center">
            <HStack spacing={3}>
                <Text color="gray.400" fontSize="sm" fontWeight="medium">
                    Able Hiring
                </Text>
            </HStack>
            <Heading size="xl" color="gray.900" fontWeight="bold" textAlign="center">
                Set Up Your Company
            </Heading>
            <Text color="gray.500" fontSize="md" textAlign="center">
                Complete your company&#39;s initial setup
            </Text>
        </VStack>
    );
};

export default OnboardingHeader;
