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

import { router } from '@inertiajs/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

export const LeaveTeamModal = ({
    team,
    open,
    onOpenChange,
}: {
    team: TTeam | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    const [processing, setProcessing] = useState(false);

    const leaveTeam = () => {
        if (!team) {
            return;
        }

        router.visit(route('teams.leave', team.id), {
            method: 'delete',
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onSuccess: () => onOpenChange(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Leave team</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to leave{' '}
                        <strong>{team?.name}</strong>?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-2">
                    <DialogClose
                        render={<Button variant="secondary">Cancel</Button>}
                    />

                    <Button
                        variant="destructive"
                        data-test="leave-team-confirm"
                        disabled={processing}
                        onClick={leaveTeam}
                    >
                        Leave team
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
