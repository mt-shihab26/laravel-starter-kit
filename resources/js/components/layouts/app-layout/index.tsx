import type { TBreadcrumb } from '@/types/utils';
import type { ReactNode } from 'react';

import { Head } from '@inertiajs/react';

import { AppHeaderLayout } from './app-header-layout';

export const AppLayout = ({
    title,
    children,
    breadcrumbs,
}: {
    title: string;
    children: ReactNode;
    breadcrumbs?: TBreadcrumb[];
}) => {
    return (
        <>
            <Head title={title} />
            <AppHeaderLayout breadcrumbs={breadcrumbs}>
                {children}
            </AppHeaderLayout>
        </>
    );
};
