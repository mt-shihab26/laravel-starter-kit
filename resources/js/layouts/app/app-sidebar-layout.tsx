import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { TBreadcrumb } from '@/components/breadcrumbs';
import type { ReactNode } from 'react';

export type TAppLayoutProps = {
    children: ReactNode;
    breadcrumbs?: TBreadcrumb[];
};

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: TAppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
