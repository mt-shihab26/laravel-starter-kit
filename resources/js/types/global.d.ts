import type { route as routeFn } from 'ziggy-js';
import type { TUser } from './models';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            sidebarOpen: boolean;
            auth: {
                user: TUser;
            };
            flash: {
                info: string | null;
                success: string | null;
                error: string | null;
            };
        };
    }
}

declare global {
    var route: typeof routeFn;
    function dd(...args: unknown[]): unknown;
}
