import type { TBreadcrumb } from '@/components/breadcrumbs';
import type { ReactNode } from 'react';

import { AppSidebarLayout } from '@/layouts/app-layout/app-sidebar-layout';
import { RootLayout } from '@/layouts/root-layout';

export const AppLayout = ({
    title,
    description,
    breadcrumbs = [],
    children,
}: {
    title: string;
    description: string;
    breadcrumbs?: TBreadcrumb[];
    children: ReactNode;
}) => {
    return (
        <RootLayout title={title} description={description}>
            <AppSidebarLayout breadcrumbs={breadcrumbs}>
                {children}
            </AppSidebarLayout>
        </RootLayout>
    );
};
