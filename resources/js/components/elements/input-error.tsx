import { cn } from '@/lib/utils';

export const InputError = ({
    className,
    message,
}: {
    className?: string;
    message?: string;
}) => {
    if (!message) {
        return null;
    }

    return (
        <p className={cn('text-sm text-red-600 dark:text-red-400', className)}>
            {message}
        </p>
    );
};
