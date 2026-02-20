import type { AppLayoutProps } from '@/types';
import { AppContent } from './app-content';
import { AppShell } from './app-shell';
import { AppSidebar } from './app-sidebar';
import { AppSidebarHeader } from './app-sidebar-header';

export function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
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
