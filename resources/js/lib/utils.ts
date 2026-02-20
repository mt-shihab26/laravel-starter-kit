import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const toUrl = (item: { route?: string; href?: string }): string => {
    return item.route ? route(item.route) : item.href || '';
};

export const isCurrentUrl = (item: {
    route?: string;
    href?: string;
}): boolean => {
    if (item.route) {
        return route().current(item.route);
    }

    if (!item.href) {
        return false;
    }

    const currentUrl = window?.location.href;

    if (!currentUrl) {
        return false;
    }

    const targetUrl = new URL(item.href, currentUrl);

    return currentUrl === targetUrl.href;
};
