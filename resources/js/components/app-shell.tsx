import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
export type TAppVariant = 'header' | 'sidebar';

type Props = {
    children: ReactNode;
    variant?: TAppVariant;
};

export const AppShell = ({ children, variant = 'sidebar' }: Props) => {
    const isOpen = usePage().props.open;

    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col">{children}</div>
        );
    }

    return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
};
