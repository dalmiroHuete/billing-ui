# Billing UI - Multi-Format Billing Application

A comprehensive billing management application built with Next.js 14, TypeScript, and Chakra UI. This application provides a complete onboarding flow for companies with different billing models and a dashboard for project management.

## Project Overview

This application serves as a frontend interface for a multi-format billing system that supports three different billing models: Pay-as-you-go, Prepaid credits, and Seat-based pricing. The system includes user authentication, company onboarding, payment processing, and project management.

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Library**: Chakra UI
- **State Management**: React Context API + React Query
- **Form Handling**: React Hook Form
- **HTTP Client**: Fetch API
- **Authentication**: JWT tokens with localStorage

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── banner/         # Banner component for login/signup
│   │   ├── feedback/       # Error/success message component
│   │   └── form/           # Generic form component
│   ├── context/            # React Context providers
│   │   ├── auth-context.tsx
│   │   ├── auth-provider.tsx
│   │   ├── onboarding-context.tsx
│   │   └── onboarding-provider.tsx
│   ├── dashboard/          # Dashboard feature
│   │   ├── components/
│   │   │   └── metrics.tsx # Dashboard metrics component
│   │   └── page.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── auth-api/       # Authentication API hooks
│   │   ├── dashboard-api/  # Dashboard API hooks
│   │   ├── onboarding-api/ # Onboarding API hooks
│   │   └── project-api/    # Project API hooks
│   ├── onboarding/         # Onboarding feature
│   │   ├── components/
│   │   │   ├── onboarding-header.tsx
│   │   │   ├── payment-drawer-wrapper.tsx
│   │   │   └── wizard.tsx
│   │   └── page.tsx
│   ├── providers/          # Global providers
│   │   └── index.tsx
│   ├── services/           # API service classes
│   │   ├── auth.service.ts
│   │   ├── dashboard.service.ts
│   │   ├── onboarding.service.ts
│   │   └── project.service.ts
│   ├── utils/              # Utilities and constants
│   │   ├── constants/
│   │   ├── helpers/
│   │   └── types/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Login page
│   └── signup/
│       └── page.tsx
└── theme.ts                # Chakra UI theme configuration
```

## Design Decisions

### Architecture Patterns

**Component Composition**: The application follows a composition-based approach where complex components are broken down into smaller, focused components. This is evident in the onboarding flow where we have separate components for the header, wizard, and payment drawer.

**Context for State Management**: Instead of prop drilling, the application uses React Context for global state management. The onboarding flow uses a dedicated context to manage the multi-step form state and API calls.

**Service Layer Pattern**: API calls are abstracted into service classes that handle authentication, error handling, and data transformation. This provides a clean separation between UI components and data fetching logic.

**Custom Hooks for API Integration**: React Query is used through custom hooks that provide caching, loading states, and error handling. Each API endpoint has its corresponding hook for consistent data fetching patterns.

### UI/UX Decisions

**Two-Panel Layout**: The login and signup pages use a two-panel layout with the form on the left and promotional content on the right. This creates a balanced visual hierarchy and provides space for marketing content.

**Responsive Design**: The application uses Chakra UI's responsive props to adapt to different screen sizes. The banner panel is hidden on small screens to prioritize the form content.

**Loading States**: Skeleton loaders are used instead of spinners to provide a better perceived performance. The skeleton matches the final layout to prevent layout shifts.

**Error Handling**: Errors are displayed using a consistent Feedback component that shows user-friendly messages while preserving technical details for debugging.

### Authentication Flow

**Token-Based Authentication**: JWT tokens are stored in localStorage and included in API requests. The application automatically refetches user profile data to keep authentication state current.

**Onboarding Redirect**: Users without a company are automatically redirected to the onboarding flow after authentication. This ensures all users complete the setup process.

**Automatic Profile Updates**: The user profile is automatically updated after successful onboarding to reflect the new company association.

## Key Features

### Authentication System
- User registration and login
- JWT token management
- Automatic profile synchronization
- Protected route handling

### Onboarding Flow
- Multi-step company setup
- Plan selection with three billing models
- Payment processing simulation
- Automatic user profile updates

### Dashboard
- Real-time metrics from backend
- Project creation functionality
- Plan-specific information display
- Responsive layout with loading states

### Billing Models
- **Pay-as-you-go**: Pay per project with no upfront costs
- **Prepaid**: Buy credits in advance with volume discounts
- **Seats**: Per-user pricing with unlimited features

## API Integration

The application integrates with a NestJS backend that provides endpoints for:
- User authentication and profile management
- Company creation and management
- Payment processing and confirmation
- Project creation and management
- Dashboard metrics and analytics

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and configure environment variables
4. Start the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Limitations

This project was developed as a comprehensive billing management system, but due to time constraints, several features were not fully implemented:

**Credit and Seat Management**: The backend includes endpoints to increase seats and credits, but the UI for managing these resources was not implemented. Users cannot currently purchase additional credits or seats through the interface.

**Payment Processing**: The credit card drawer in the onboarding flow is currently a simulation. While it integrates with the payment endpoints that create pending payments and confirm them (simulating a Stripe-like webhook flow), it doesn't process actual payments.

**Pay-as-you-go Project Creation**: For the pay-as-you-go plan, project creation should ideally open the payment drawer to cover the project cost. The infrastructure for this exists but wasn't implemented due to the scope of the project.

**Employee Management**: The "Simulate Hire Employee" feature was not included in the final implementation, though the UI elements and API structure are in place for future development.

## Future Enhancements

The codebase is structured to support future enhancements including:
- Real payment processing integration
- Advanced project management features
- Team member invitation and management
- Detailed analytics and reporting
- Credit and seat purchase flows
- Webhook handling for payment confirmations
