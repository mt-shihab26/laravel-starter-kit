import {
    Folder,
    LayoutGrid,
    LockIcon,
    PaletteIcon,
    ShieldCheckIcon,
    UserIcon,
} from 'lucide-react';

import type { TNavItem } from '@/types/utils';

export const mainNavItems: TNavItem[] = [
    {
        title: 'Dashboard',
        route: 'dashboard',
        icon: LayoutGrid,
    },
];

export const secondNavItems: TNavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/mt-shihab26/laravel-starter-kit',
        icon: Folder,
    },
];

export const settingsNavItems: TNavItem[] = [
    {
        title: 'Profile',
        route: 'profile.edit',
        icon: UserIcon,
    },
    {
        title: 'Password',
        route: 'user-password.edit',
        icon: LockIcon,
    },
    {
        title: 'Two-Factor Auth',
        route: 'two-factor.show',
        icon: ShieldCheckIcon,
    },
    {
        title: 'Appearance',
        route: 'appearance.edit',
        icon: PaletteIcon,
    },
];
