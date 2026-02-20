import type { TBreadcrumb } from '@/types/utils';
import type { ReactNode } from 'react';

import { settingsNavItems } from '@/lib/links';
import { cn, isCurrentUrl, toUrl } from '@/lib/utils';

import { Heading } from '@/components/elements/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { AppLayout } from '../app-layout';

export const SettingsLayout = ({
    title,
    breadcrumbs = [],
    children,
}: {
    title: string;
    breadcrumbs?: TBreadcrumb[];
    children: ReactNode;
}) => {
    return (
        <AppLayout
            title={title}
            breadcrumbs={[
                { title: 'Settings', route: 'settings' },
                ...breadcrumbs,
            ]}
        >
            <div className="px-4 py-6">
                <Heading
                    title="Settings"
                    description="Manage your profile and account settings"
                />

                <div className="flex flex-col lg:flex-row lg:space-x-12">
                    <aside className="w-full max-w-xl lg:w-48">
                        <nav
                            className="flex flex-col space-y-1 space-x-0"
                            aria-label="Settings"
                        >
                            {settingsNavItems.map((item, index) => (
                                <Button
                                    key={`${toUrl(item)}-${index}`}
                                    size="sm"
                                    variant="ghost"
                                    asChild
                                    className={cn('w-full justify-start', {
                                        'bg-muted': isCurrentUrl(item),
                                    })}
                                >
                                    <Link href={toUrl(item)}>
                                        {item.icon && (
                                            <item.icon className="h-4 w-4" />
                                        )}
                                        {item.title}
                                    </Link>
                                </Button>
                            ))}
                        </nav>
                    </aside>

                    <Separator className="my-6 lg:hidden" />

                    <div className="flex-1 md:max-w-2xl">
                        <section className="max-w-xl space-y-12">
                            <h1 className="sr-only">{title}</h1>
                            {children}
                        </section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};
