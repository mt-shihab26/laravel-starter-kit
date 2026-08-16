import type { route as routeFn } from 'ziggy-js';
import type { TTeam, TUser } from './models';

declare module 'react' {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare global {
    var route: typeof routeFn;
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            open: boolean;
            auth: {
                user: TUser | null;
                team: TTeam | null;
                teams: TTeam[];
                canManageTeam: boolean;
            };
            flash: {
                success: string | null;
                error: string | null;
                info: string | null;
                warning: string | null;
            };
        };
    }
}
