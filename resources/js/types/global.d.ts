import type { Auth } from '@/types/auth';

import type { route as routeFn } from 'ziggy-js';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}

declare global {
    var route: typeof routeFn;
}
