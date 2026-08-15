import { Head } from '@inertiajs/react';
import { AppearanceToggleTab } from '@/components/appearance-tabs';
import { Heading } from '@/components/heading';

const Appearance = () => {
    return (
        <>
            <Head title="Appearance settings" />

            <h1 className="sr-only">Appearance settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Appearance settings"
                    description="Update the appearance settings for your account"
                />
                <AppearanceToggleTab />
            </div>
        </>
    );
};

Appearance.layout = {
    breadcrumbs: [
        {
            title: 'Appearance settings',
            href: route('appearance.edit'),
        },
    ],
};

export default Appearance;
