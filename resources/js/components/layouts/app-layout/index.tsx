import type { TBreadcrumb } from '@/types/utils';
import type { ReactNode } from 'react';

import { AppSidebarLayout } from './app-sidebar-layout';

export const AppLayout = ({
    children,
    breadcrumbs,
}: {
    children: ReactNode;
    breadcrumbs?: TBreadcrumb[];
}) => {
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            {children}
        </AppSidebarLayout>
    );
};
