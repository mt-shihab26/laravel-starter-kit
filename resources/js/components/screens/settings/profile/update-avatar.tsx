import { useAuth } from '@/hooks/use-auth';
import { router, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

import { Heading } from '@/components/elements/heading';
import { InputError } from '@/components/elements/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export const UpdateAvatar = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const { user } = useAuth();

    const { setData, post, processing, errors } = useForm<{
        avatar: File | null;
    }>({
        avatar: null,
    });

    const displayAvatar = avatarPreview || user.avatar || null;

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
                    <Label>Photo</Label>

                    <div className="flex items-center gap-4">
                        {displayAvatar ? (
                            <img
                                src={displayAvatar}
                                alt={user.name}
                                className="size-16 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex size-16 items-center justify-center rounded-full bg-muted text-xl font-medium text-muted-foreground">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Change
                            </Button>

                            {user.avatar && !avatarPreview && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
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
                                    Remove
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
