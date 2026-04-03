import type { ReactNode } from 'react';

import { useFlashMessages } from '@/hooks/use-flash-messages';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

export const RootLayout = ({ children }: { children: ReactNode }) => {
    useFlashMessages();

    return (
        <TooltipProvider>
            {children}
            <Toaster position="top-center" />
        </TooltipProvider>
    );
};
