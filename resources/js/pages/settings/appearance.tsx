import { AppearanceToggleTab } from '@/components/appearance-tabs';
import { Heading } from '@/components/heading';
import { SettingsLayout } from '@/components/layouts/settings-layout';

const Appearance = () => {
    return (
        <SettingsLayout
            title="Appearance settings"
            description="Update the appearance settings for your account"
        >
            <h1 className="sr-only">Appearance settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Appearance settings"
                    description="Update the appearance settings for your account"
                />
                <AppearanceToggleTab />
            </div>
        </SettingsLayout>
    );
};

export default Appearance;
