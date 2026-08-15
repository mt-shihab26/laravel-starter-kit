import { PlaceholderPattern } from '@/components/elements/placeholder-pattern';
import {
    PendingInvitationsModal,
    type TDashboardInvitation,
} from '@/components/pending-invitations-modal';
import { AppLayout } from '@/components/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

type Props = {
    pendingInvitations?: TDashboardInvitation[];
};

const Dashboard = ({ pendingInvitations = [] }: Props) => {
    const { currentTeam } = usePage().props.auth;
    const [showInvitations, setShowInvitations] = useState(
        pendingInvitations.length > 0,
    );

    return (
        <AppLayout
            title="Dashboard"
            description="Overview of your account activity"
            breadcrumbs={[
                {
                    title: 'Dashboard',
                    href: currentTeam ? route('dashboard', currentTeam.id) : '/',
                },
            ]}
        >
            <Head title="Dashboard" />
            <PendingInvitationsModal
                invitations={pendingInvitations}
                open={pendingInvitations.length > 0 && showInvitations}
                onOpenChange={setShowInvitations}
            />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;
