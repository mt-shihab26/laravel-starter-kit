import { Heading } from '@/components/elements/heading';
import { AppLayout } from '@/components/layouts/app-layout';
import { SettingsLayout } from '@/components/layouts/settings-layout';

import { AppearanceTabs } from '@/components/screens/settings/appearance/appearance-tabs';

export default function Appearance() {
    return (
        <AppLayout
            title="Appearance settings"
            breadcrumbs={[
                {
                    title: 'Appearance settings',
                    href: route('appearance.edit'),
                },
            ]}
        >
            <h1 className="sr-only">Appearance Settings</h1>

            <SettingsLayout>
                <div className="space-y-6">
                    <Heading
                        variant="small"
                        title="Appearance settings"
                        description="Update your account's appearance settings"
                    />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
