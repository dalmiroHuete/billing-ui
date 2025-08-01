import { AppProviders } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body suppressHydrationWarning>
                 <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
