import { PlanOption } from '@/app/utils/types/onboarding.type';

export const PLAN_OPTIONS: PlanOption[] = [
    {
        id: 'pay-as-you-go',
        type: 'PAY_AS_YOU_GO',
        title: 'Pay-as-you-go',
        description: 'Pay only for what you use',
        price: 0.10,
        credits: 100,
        seats: 0,
        features: [
            'Pay per credit used',
            'No monthly commitment',
            'Flexible scaling',
            'Real-time billing'
        ]
    },
    {
        id: 'prepaid',
        type: 'PREPAID',
        title: 'Prepaid',
        description: 'Buy credits in advance',
        price: 50,
        credits: 500,
        seats: 0,
        features: [
            '500 credits included',
            '20% discount on credits',
            'No expiration date',
            'Priority support'
        ]
    },
    {
        id: 'seats',
        type: 'SEATS',
        title: 'Seats',
        description: 'Per-user pricing',
        price: 99,
        credits: 0,
        seats: 5,
        features: [
            '5 team members included',
            'Unlimited credits per seat',
            'Advanced analytics',
            'Dedicated account manager'
        ]
    }
]; 