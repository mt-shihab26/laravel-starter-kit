import type { TBreadcrumb } from '@/types/utils';
import type { ReactNode } from 'react';

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
        <>
            <Head title={title} />
            <AppSidebarLayout breadcrumbs={[...breadcrumbs, { title }]}>
                {children}
            </AppSidebarLayout>
        </>
    );
};
