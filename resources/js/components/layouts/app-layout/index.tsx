import type { TBreadcrumb } from '@/types/utils';
import type { ReactNode } from 'react';

import { RootLayout } from '@/components/layouts/root-layout';
import { Head } from '@inertiajs/react';
import { AppSidebarLayout } from './app-sidebar-layout';

export const AppLayout = ({
    title,
    breadcrumbs = [],
    children,
}: {
    title: string;
    breadcrumbs?: TBreadcrumb[];
    children: ReactNode;
}) => {
    return (
        <RootLayout>
            <Head title={title} />
            <AppSidebarLayout breadcrumbs={[...breadcrumbs, { title }]}>
                {children}
            </AppSidebarLayout>
        </RootLayout>
    );
};
