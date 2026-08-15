import type { TBreadcrumb } from '@/components/breadcrumbs';

import AppLayoutTemplate from '@/layouts/app-layout/app-sidebar-layout';

export const AppLayout = ({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: TBreadcrumb[];
    children: React.ReactNode;
}) => {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
        </AppLayoutTemplate>
    );
};
