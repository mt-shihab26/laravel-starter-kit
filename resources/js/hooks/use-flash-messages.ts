import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const useFlashMessages = (): void => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.info) {
            toast.info(flash.info, {
                action: {
                    label: 'Close',
                    onClick: () => {},
                },
            });
        }
    }, [flash.info]);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                action: {
                    label: 'Close',
                    onClick: () => {},
                },
            });
        }
    }, [flash.success]);

    useEffect(() => {
        if (flash.error) {
            toast.error(flash.error, {
                action: {
                    label: 'Close',
                    onClick: () => {},
                },
            });
        }
    }, [flash.error]);
};
