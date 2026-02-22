import type { ReactNode } from 'react';

import { RootLayout } from '@/components/layouts/root-layout';
import { Head } from '@inertiajs/react';
import { AuthSimpleLayout } from './auth-simple-layout';

export const AuthLayout = ({
    children,
    title,
    description,
}: {
    children: ReactNode;
    title: string;
    description: string;
}) => {
    return (
        <RootLayout>
            <Head title={title} />
            <AuthSimpleLayout title={title} description={description}>
                {children}
            </AuthSimpleLayout>
        </RootLayout>
    );
};
