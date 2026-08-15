import type { TBreadcrumb } from '@/components/layouts/app-layout/breadcrumbs';
import type { ReactNode } from 'react';

import { AppContent } from '@/components/layouts/app-layout/app-content';
import { AppHeader } from '@/components/layouts/app-layout/app-header';
import { AppShell } from '@/components/layouts/app-layout/app-shell';

export const AppHeaderLayout = ({
    children,
    breadcrumbs,
}: {
    children: ReactNode;
    breadcrumbs?: TBreadcrumb[];
}) => {
    return (
        <AppShell variant="header">
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent variant="header">{children}</AppContent>
        </AppShell>
    );
};
