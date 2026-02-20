import type { TNavItem } from '@/types/utils';

import { BookOpen, Folder, LayoutGrid } from 'lucide-react';

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
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];
