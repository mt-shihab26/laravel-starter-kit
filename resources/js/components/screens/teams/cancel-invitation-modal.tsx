import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import type { TTeam } from '@/types/models';
import type { TTeamRole } from '@/types/enums';

import { router } from '@inertiajs/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

export type TTeamInvitationSummary = {
    code: string;
    email: string;
    role: TTeamRole;
    role_label: string;
    created_at: string;
};

export const CancelInvitationModal = ({
    team,
    invitation,
    open,
    onOpenChange,
}: {
    team: TTeam;
    invitation: TTeamInvitationSummary | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    const [processing, setProcessing] = useState(false);

    const cancelInvitation = () => {
        if (!invitation) {
            return;
        }

        router.visit(
            route('teams.invitations.destroy', [team.id, invitation.code]),
            {
                method: 'delete',
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
                onSuccess: () => onOpenChange(false),
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cancel invitation</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to cancel the invitation for{' '}
                        <strong>{invitation?.email}</strong>?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-2">
                    <DialogClose
                        render={
                            <Button variant="secondary">Keep invitation</Button>
                        }
                    />

                    <Button
                        variant="destructive"
                        data-test="cancel-invitation-confirm"
                        disabled={processing}
                        onClick={cancelInvitation}
                    >
                        Cancel invitation
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
