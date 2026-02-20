import type { AppLayoutProps } from '@/types';
import AppLayoutTemplate from './app-sidebar-layout';

export const AppLayout = ({
    children,
    breadcrumbs,
    ...props
}: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppLayoutTemplate>
);
