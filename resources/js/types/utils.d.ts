import type { LucideIcon } from 'lucide-react';

export type TBreadcrumb = {
    title: string;
    href: string;
};

export type TNavItem = {
    title: string;
    route?: string;
    href?: string;
    icon?: LucideIcon | null;
};
