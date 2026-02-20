import { Heading } from '@/components/elements/heading';
import { SettingsLayout } from '@/components/layouts/settings-layout';

import { AppearanceTabs } from '@/components/screens/settings/appearance/appearance-tabs';

const Appearance = () => {
    return (
        <SettingsLayout title="Appearance settings">
            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Appearance settings"
                    description="Update your account's appearance settings"
                />
                <AppearanceTabs />
            </div>
        </SettingsLayout>
    );
};

export default Appearance;
