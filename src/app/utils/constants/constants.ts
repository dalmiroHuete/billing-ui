import {FormField} from "@/app/utils/types/form-field.type";

export const LOGIN = {
    DONT_HAVE_ACCOUNT: 'Don\'t have an account?'
}

export const loginFields: FormField[] = [
    {name: "email", type: "email", label: "Email", required: true},
    {name: "password", type: "password", label: "Password", required: true}
];

export const signupFields: FormField[] = [
    {name: "firstName", type: "text", label: "First Name", required: true},
    {name: "lastName", type: "text", label: "Last Name", required: true},
    {name: "email", type: "email", label: "Email", required: true},
    {name: "password", type: "password", label: "Password", required: true}
];

export const companyFields: FormField[] = [
    {name: "name", type: "text", label: "Company Name", required: true},
    {name: "description", type: "text", label: "Company Description", required: true}
];

export const paymentFields: FormField[] = [
    {name: "cardNumber", type: "text", label: "Card Number", required: true, placeholder: "1234 5678 9012 3456"},
    {name: "cardHolder", type: "text", label: "Card Holder Name", required: true},
    {name: "expiryDate", type: "text", label: "Expiry Date", required: true, placeholder: "MM/YY"},
    {name: "cvv", type: "text", label: "CVV", required: true, placeholder: "123"}
];

export const onboardingSteps = [
    { number: 1, title: "Company Information" },
    { number: 2, title: "Plan Selection" }
];

import { PlanOption } from '@/app/utils/types/onboarding.type';

export const PLAN_OPTIONS: PlanOption[] = [
    {
        id: 'pay-as-you-go',
        type: 'PAY_AS_YOU_GO',
        title: 'Pay-as-you-go',
        description: 'Pay per project based on your needs',
        price: 0,
        features: [
            'Basic projects: $20',
            'Advanced projects: $50',
            'Dashboard access',
            'Advanced search features',
            'Email support',
            'No monthly commitments'
        ]
    },
    {
        id: 'prepaid',
        type: 'PREPAID',
        title: 'Prepaid Credits',
        description: 'Buy initial credits and use them when needed',
        price: 100,
        credits: 10,
        features: [
            '10 credits = $100',
            'Create project: 5 credits',
            'Hire staff: 10 credits',
            'Credits never expire',
            'Volume discounts',
            'Priority support'
        ]
    },
    {
        id: 'seats',
        type: 'SEATS',
        title: 'Seat-based',
        description: 'Pay per user seat with unlimited benefits',
        price: 30,
        seats: 1,
        features: [
            '$30 per seat/month',
            'Unlimited benefits per user',
            'Create unlimited projects',
            'Full access to all features',
            '24/7 support',
            'Automatic scaling'
        ]
    }
];
