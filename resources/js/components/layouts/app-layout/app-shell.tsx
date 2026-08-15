import type { ReactNode } from 'react';

import { usePage } from '@inertiajs/react';

import { SidebarProvider } from '@/components/ui/sidebar';

type TAppVariant = 'header' | 'sidebar';

export const AppShell = ({
    children,
    variant = 'sidebar',
}: {
    children: ReactNode;
    variant?: TAppVariant;
}) => {
    const isOpen = usePage().props.open;

    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col">{children}</div>
        );
    }

    return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
};
