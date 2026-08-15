import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import type { TTeam } from '@/types/models';
import type { TTeamRole } from '@/types/enums';

import { useState } from 'react';

import { Form } from '@inertiajs/react';
import { InputError } from '@/components/elements/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type TTeamRoleOption = {
    value: TTeamRole;
    label: string;
};

export const InviteMemberModal = ({
    team,
    availableRoles,
    open,
    onOpenChange,
}: {
    team: TTeam;
    availableRoles: TTeamRoleOption[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    const [inviteRole, setInviteRole] =
        useState<TTeamRoleOption['value']>('member');

    const handleOpenChange = (nextOpen: boolean) => {
        onOpenChange(nextOpen);

        if (!nextOpen) {
            setInviteRole('member');
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <Form
                    key={String(open)}
                    action={route('teams.invitations.store', team.id)}
                    method="post"
                    className="space-y-6"
                    onSuccess={() => onOpenChange(false)}
                >
                    {({ errors, processing }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>Invite a team member</DialogTitle>
                                <DialogDescription>
                                    Send an invitation to join this team.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        data-test="invite-email"
                                        placeholder="colleague@example.com"
                                        required
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select
                                        name="role"
                                        data-test="invite-role"
                                        value={inviteRole}
                                        onValueChange={(value) =>
                                            setInviteRole(
                                                value as TTeamRoleOption['value'],
                                            )
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableRoles.map((role) => (
                                                <SelectItem
                                                    key={role.value}
                                                    value={role.value}
                                                >
                                                    {role.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.role} />
                                </div>
                            </div>

                            <DialogFooter className="gap-2">
                                <DialogClose
                                    render={
                                        <Button variant="secondary">
                                            Cancel
                                        </Button>
                                    }
                                />

                                <Button
                                    type="submit"
                                    data-test="invite-submit"
                                    disabled={processing}
                                >
                                    Send invitation
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
};
