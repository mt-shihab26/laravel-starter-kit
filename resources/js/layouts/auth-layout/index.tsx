import { AuthSimpleLayout as AuthLayoutTemplate } from './auth-simple-layout';

export const AuthLayout = ({
    title,
    description,
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) => {
    return (
        <AuthLayoutTemplate title={title} description={description}>
            {children}
        </AuthLayoutTemplate>
    );
};
