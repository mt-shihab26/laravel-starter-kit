import { AuthSimpleLayout } from './auth-simple-layout';

export function AuthLayout({
    children,
    title,
    description,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <AuthSimpleLayout title={title} description={description} {...props}>
            {children}
        </AuthSimpleLayout>
    );
}
