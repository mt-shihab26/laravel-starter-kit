import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import type { TBreadcrumb } from '@/components/breadcrumbs';
import type { ReactNode } from 'react';

type TAppLayoutProps = {
    children: ReactNode;
    breadcrumbs?: TBreadcrumb[];
};

export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: TAppLayoutProps) {
    return (
        <AppShell variant="header">
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent variant="header">{children}</AppContent>
        </AppShell>
    );
}
