import type { TNavItem } from '@/types/utils';
import type { PropsWithChildren } from 'react';

import { Heading } from '@/components/elements/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import { Link } from '@inertiajs/react';

const sidebarNavItems: TNavItem[] = [
    {
        title: 'Profile',
        route: route('profile.edit'),
        icon: null,
    },
    {
        title: 'Password',
        route: route('user-password.edit'),
        icon: null,
    },
    {
        title: 'Two-Factor Auth',
        route: route('two-factor.show'),
        icon: null,
    },
    {
        title: 'Appearance',
        route: route('appearance.edit'),
        icon: null,
    },
];

export function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentUrl } = useCurrentUrl();

    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    return (
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
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${toUrl(item.route)}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': isCurrentUrl(item.route),
                                })}
                            >
                                <Link href={item.route}>
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
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
