import type { TBreadcrumb } from '@/types/utils';
import type { ReactNode } from 'react';

import { AppContent } from './app-content';
import { AppShell } from './app-shell';
import { AppSidebar } from './app-sidebar';
import { AppSidebarHeader } from './app-sidebar-header';

export const AppSidebarLayout = ({
    children,
    breadcrumbs = [],
}: {
    children: ReactNode;
    breadcrumbs?: TBreadcrumb[];
}) => {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
};
