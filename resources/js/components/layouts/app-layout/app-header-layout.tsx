import type { TBreadcrumb } from '@/types/utils';
import type { ReactNode } from 'react';

import { AppContent } from './app-content';
import { AppHeader } from './app-header';
import { AppShell } from './app-shell';

export function AppHeaderLayout({
    children,
    breadcrumbs,
}: {
    children: ReactNode;
    breadcrumbs?: TBreadcrumb[];
}) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
