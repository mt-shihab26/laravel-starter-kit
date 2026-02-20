import type { InertiaLinkProps } from '@inertiajs/react';

import { toUrl } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

export const useCurrentUrl = () => {
    const page = usePage();

    const currentUrl = new URL(page.url, window?.location.origin).pathname;

    const isCurrentUrl = (
        urlToCheck: NonNullable<InertiaLinkProps['href']>,
        currentUrl?: string,
    ) => {
        const urlToCompare = currentUrl ?? currentUrl;
        const urlString = toUrl(urlToCheck);

        if (!urlString.startsWith('http')) {
            return urlString === urlToCompare;
        }

        try {
            const absoluteUrl = new URL(urlString);
            return absoluteUrl.pathname === urlToCompare;
        } catch {
            return false;
        }
    };

    const whenCurrentUrl = <TIfTrue, TIfFalse = null>(
        urlToCheck: NonNullable<InertiaLinkProps['href']>,
        ifTrue: TIfTrue,
        ifFalse: TIfFalse = null as TIfFalse,
    ): TIfTrue | TIfFalse => {
        return isCurrentUrl(urlToCheck) ? ifTrue : ifFalse;
    };

    return {
        currentUrl,
        isCurrentUrl,
        whenCurrentUrl,
    };
};
