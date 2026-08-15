import { SidebarInset } from '@/components/ui/sidebar';

export type TAppVariant = 'header' | 'sidebar';

type Props = React.ComponentProps<'main'> & {
    variant?: TAppVariant;
};

export function AppContent({ variant = 'sidebar', children, ...props }: Props) {
    if (variant === 'sidebar') {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }

    return (
        <main
            className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl"
            {...props}
        >
            {children}
        </main>
    );
}
