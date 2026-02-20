import type { TAuth } from '@/types/auth';

import type { route as routeFn } from 'ziggy-js';

type TAuth = {
    user: TUser;
};

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: TAuth;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}

declare global {
    var route: typeof routeFn;
}
