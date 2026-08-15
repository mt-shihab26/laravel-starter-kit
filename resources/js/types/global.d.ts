import type { TTeam } from '@/types/teams';
import type { route as routeFn } from 'ziggy-js';

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
                user: TUser;
                currentTeam: TTeam | null;
                teams: TTeam[];
            };
        };
    }
}
