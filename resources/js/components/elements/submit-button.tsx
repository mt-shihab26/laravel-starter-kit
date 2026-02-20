import { Button } from '@/components/ui/button';
import { Transition } from '@headlessui/react';

export const SubmitButton = ({
    loading,
    recentlySuccessful,
    children = 'Save',
    successMessage = 'Saved',
    ...props
}: {
    loading?: boolean;
    recentlySuccessful: boolean;
    children?: React.ReactNode;
    successMessage?: string;
} & Omit<React.ComponentProps<typeof Button>, 'children'>) => {
    return (
        <div className="flex items-center gap-4">
            <Button disabled={loading} {...props}>
                {children}
            </Button>

            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <p className="text-sm text-neutral-600">{successMessage}</p>
            </Transition>
        </div>
    );
};
