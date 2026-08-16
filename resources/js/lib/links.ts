import {
    BookOpen,
    Folder,
    LayoutGrid,
    Lock,
    Palette,
    User,
    Users,
} from 'lucide-react';

import type { TNavItem } from '@/types/utils';
import type { TTeam } from '@/types/models';

export const mainNavItems = (currentTeam: TTeam | null): TNavItem[] => {
    const dashboardUrl = currentTeam
        ? route('dashboard', { team: currentTeam.id })
        : '/';

    return [
        {
            title: 'Dashboard',
            href: dashboardUrl,
            icon: LayoutGrid,
        },
    ];
};

export const secondaryNavItems: TNavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export const settingsLinks = (): TNavItem[] => {
    return [
        {
            title: 'Profile',
            href: route('settings.profile.edit'),
            icon: User,
        },
        {
            title: 'Security',
            href: route('settings.security.edit'),
            icon: Lock,
        },
        {
            title: 'Teams',
            href: route('teams.index'),
            icon: Users,
        },
        {
            title: 'Appearance',
            href: route('settings.appearance.edit'),
            icon: Palette,
        },
    ];
};
