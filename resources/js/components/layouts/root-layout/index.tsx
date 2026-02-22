import type { ReactNode } from 'react';

import { useFlashMessages } from '@/hooks/use-flash-messages';

import { Toaster } from '@/components/ui/sonner';

export const RootLayout = ({ children }: { children: ReactNode }) => {
    useFlashMessages();

    return (
        <>
            {children}
            <Toaster position="top-center" />
        </>
    );
};
