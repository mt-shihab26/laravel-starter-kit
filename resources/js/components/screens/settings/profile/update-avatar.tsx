import { useAuth } from '@/hooks/use-auth';
import { formatInitials } from '@/lib/formats';
import { router, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

import { Heading } from '@/components/elements/heading';
import { InputError } from '@/components/elements/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

export const UpdateAvatar = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const { user } = useAuth();

    const { setData, post, processing, errors } = useForm<{
        avatar: File | null;
    }>({
        avatar: null,
    });

    const displayAvatar = avatarPreview || user.avatar || undefined;

    return (
        <div className="space-y-6">
            <Heading
                variant="small"
                title="Avatar"
                description="Update your profile photo"
            />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post(route('profile.avatar.update'), {
                        preserveScroll: true,
                        onSuccess: () => {
                            setAvatarPreview(null);
                            if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                            }
                        },
                    });
                }}
                className="space-y-6"
            >
                <div className="grid gap-2">
                    <div className="relative inline-flex self-start">
                        <Avatar className="size-50 text-4xl">
                            <AvatarImage src={displayAvatar} alt={user.name} />
                            <AvatarFallback>
                                {formatInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="absolute right-1 bottom-1 flex gap-1">
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="size-8 rounded-full shadow-sm"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Pencil className="size-4" />
                                <span className="sr-only">Change avatar</span>
                            </Button>

                            {user.avatar && !avatarPreview && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="size-8 rounded-full shadow-sm"
                                    onClick={() => {
                                        router.delete(
                                            route('profile.avatar.destroy'),
                                            {
                                                preserveScroll: true,
                                                onSuccess: () => {
                                                    setAvatarPreview(null);
                                                    if (fileInputRef.current) {
                                                        fileInputRef.current.value =
                                                            '';
                                                    }
                                                },
                                            },
                                        );
                                    }}
                                >
                                    <Trash2 className="size-4" />
                                    <span className="sr-only">
                                        Remove avatar
                                    </span>
                                </Button>
                            )}
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setData('avatar', file);
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        setAvatarPreview(
                                            event.target?.result as string,
                                        );
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>

                    <InputError message={errors.avatar} />
                </div>

                {avatarPreview && <Button disabled={processing}>Upload</Button>}
            </form>
        </div>
    );
};
