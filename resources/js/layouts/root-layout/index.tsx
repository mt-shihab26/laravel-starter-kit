import type { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

export const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <TooltipProvider delay={0}>
            {children}
            <Toaster />
        </TooltipProvider>
    );
};
