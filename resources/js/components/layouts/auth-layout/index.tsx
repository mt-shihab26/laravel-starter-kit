import type { ReactNode } from 'react';

import { Head } from '@inertiajs/react';
import { AuthSimpleLayout } from './auth-simple-layout';

export function AuthLayout({
    children,
    title,
    description,
}: {
    children: ReactNode;
    title: string;
    description: string;
}) {
    return (
        <>
            <Head title={title} />
            <AuthSimpleLayout title={title} description={description}>
                {children}
            </AuthSimpleLayout>
        </>
    );
}
