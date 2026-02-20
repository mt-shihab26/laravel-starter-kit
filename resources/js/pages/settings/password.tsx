import { useRef } from 'react';

import { Heading } from '@/components/elements/heading';
import { InputError } from '@/components/elements/input-error';
import { SubmitButton } from '@/components/elements/submit-button';
import { SettingsLayout } from '@/components/layouts/settings-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form } from '@inertiajs/react';

const Password = () => {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    return (
        <SettingsLayout title="Password settings">
            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Update password"
                    description="Ensure your account is using a long, random password to stay secure"
                />

                <Form
                    action={route('settings.password.update')}
                    method="put"
                    options={{
                        preserveScroll: true,
                    }}
                    resetOnError={[
                        'password',
                        'password_confirmation',
                        'current_password',
                    ]}
                    resetOnSuccess
                    onError={(errors) => {
                        if (errors.password) {
                            passwordInput.current?.focus();
                        }

                        if (errors.current_password) {
                            currentPasswordInput.current?.focus();
                        }
                    }}
                    className="space-y-6"
                >
                    {({ errors, processing, recentlySuccessful }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="current_password">
                                    Current password
                                </Label>

                                <Input
                                    id="current_password"
                                    ref={currentPasswordInput}
                                    name="current_password"
                                    type="password"
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    placeholder="Current password"
                                />

                                <InputError message={errors.current_password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">New password</Label>

                                <Input
                                    id="password"
                                    ref={passwordInput}
                                    name="password"
                                    type="password"
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    placeholder="New password"
                                />

                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm password
                                </Label>

                                <Input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    placeholder="Confirm password"
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <SubmitButton
                                loading={processing}
                                recentlySuccessful={recentlySuccessful}
                                data-test="update-password-button"
                            />
                        </>
                    )}
                </Form>
            </div>
        </SettingsLayout>
    );
};

export default Password;
