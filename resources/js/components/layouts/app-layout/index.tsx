import type { AppLayoutProps } from '@/types';

import { AppSidebarLayout } from './app-sidebar-layout';

export const AppLayout = ({
    children,
    breadcrumbs,
    ...props
}: AppLayoutProps) => (
    <AppSidebarLayout breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppSidebarLayout>
);
