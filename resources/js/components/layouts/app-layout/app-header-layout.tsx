import type { AppLayoutProps } from '@/types';

import { AppContent } from './app-content';
import { AppHeader } from './app-header';
import { AppShell } from './app-shell';

export function AppHeaderLayout({ children, breadcrumbs }: AppLayoutProps) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
