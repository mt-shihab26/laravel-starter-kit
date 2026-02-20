import type { TBreadcrumb } from '@/types/utils';
import type { ReactNode } from 'react';

import { Head } from '@inertiajs/react';

import { AppSidebarLayout } from './app-sidebar-layout';

export const AppLayout = ({
    title,
    children,
    breadcrumbs = [],
}: {
    title: string;
    children: ReactNode;
    breadcrumbs?: TBreadcrumb[];
}) => {
    return (
        <>
            <Head title={title} />
            <AppSidebarLayout breadcrumbs={[...breadcrumbs, { title }]}>
                {children}
            </AppSidebarLayout>
        </>
    );
};
