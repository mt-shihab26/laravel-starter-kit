import type { ReactNode } from 'react';

import { usePage } from '@inertiajs/react';

import { SidebarProvider } from '@/components/ui/sidebar';

export const AppShell = ({
    children,
    variant = 'header',
}: {
    children: ReactNode;
    variant?: 'header' | 'sidebar';
}) => {
    const { sidebarOpen } = usePage().props;

    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col">{children}</div>
        );
    }

    return (
        <SidebarProvider defaultOpen={sidebarOpen}>{children}</SidebarProvider>
    );
};
