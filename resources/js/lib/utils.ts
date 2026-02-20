import type { TNavItem } from '@/types/utils';
import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const toUrl = (navItem: TNavItem): string => {
    return navItem.route ? route(navItem.route) : navItem.href || '';
};

export const isCurrentUrl = (navItem: TNavItem): boolean => {
    if (navItem.route) {
        return route().current(navItem.route);
    }

    if (!navItem.href) {
        return false;
    }

    const currentUrl = window?.location.href;

    if (!currentUrl) {
        return false;
    }

    const targetUrl = new URL(navItem.href, currentUrl);

    return currentUrl === targetUrl.href;
};
