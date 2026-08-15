import type { ReactNode } from 'react';

import { RootLayout } from '@/layouts/root-layout';
import { AuthSimpleLayout } from './auth-simple-layout';

export const AuthLayout = ({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: ReactNode;
}) => {
    return (
        <RootLayout title={title} description={description}>
            <AuthSimpleLayout title={title} description={description}>
                {children}
            </AuthSimpleLayout>
        </RootLayout>
    );
};
