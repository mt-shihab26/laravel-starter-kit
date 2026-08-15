import type { TBreadcrumb } from '@/components/breadcrumbs';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: TBreadcrumb[];
    children: React.ReactNode;
}) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
        </AppLayoutTemplate>
    );
}
