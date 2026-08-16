import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { TTeamRoleOption } from '@/components/screens/teams/invite-member-modal';
import type { TTeamMemberSummary } from '@/components/screens/teams/remove-member-modal';
import type { TTeamInvitationSummary } from '@/components/screens/teams/cancel-invitation-modal';
import type { TTeam } from '@/types/models';

import { router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { formatInitials } from '@/lib/formats';

import { Form } from '@inertiajs/react';
import { ChevronDown, Mail, UserPlus, X } from 'lucide-react';
import { DeleteTeamModal } from '@/components/layouts/app-layout/delete-team-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heading } from '@/components/elements/heading';
import { InputError } from '@/components/elements/input-error';
import { InviteMemberModal } from '@/components/screens/teams/invite-member-modal';
import { SettingsLayout } from '@/components/layouts/settings-layout';
import { RemoveMemberModal } from '@/components/screens/teams/remove-member-modal';
import { CancelInvitationModal } from '@/components/screens/teams/cancel-invitation-modal';

const TeamEdit = ({
    team,
    members,
    invitations,
    canManageTeam,
    availableRoles,
}: {
    team: TTeam;
    members: TTeamMemberSummary[];
    invitations: TTeamInvitationSummary[];
    canManageTeam: boolean;
    availableRoles: TTeamRoleOption[];
}) => {
    const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [removeMemberDialogOpen, setRemoveMemberDialogOpen] = useState(false);
    const [memberToRemove, setMemberToRemove] =
        useState<TTeamMemberSummary | null>(null);
    const [cancelInvitationDialogOpen, setCancelInvitationDialogOpen] =
        useState(false);
    const [invitationToCancel, setInvitationToCancel] =
        useState<TTeamInvitationSummary | null>(null);

    const pageTitle = useMemo(
        () => (canManageTeam ? `Edit ${team.name}` : `View ${team.name}`),
        [canManageTeam, team.name],
    );

    const updateMemberRole = (member: TTeamMemberSummary, newRole: string) => {
        router.visit(route('teams.members.update', [team.id, member.id]), {
            method: 'patch',
            data: { role: newRole },
            preserveScroll: true,
        });
    };

    const confirmRemoveMember = (member: TTeamMemberSummary) => {
        setMemberToRemove(member);
        setRemoveMemberDialogOpen(true);
    };

    const confirmCancelInvitation = (invitation: TTeamInvitationSummary) => {
        setInvitationToCancel(invitation);
        setCancelInvitationDialogOpen(true);
    };

    return (
        <SettingsLayout
            title={pageTitle}
            description="Update your team name and settings"
        >
            <h1 className="sr-only">{pageTitle}</h1>

            <div className="flex flex-col space-y-10">
                <div className="space-y-6">
                    {canManageTeam ? (
                        <>
                            <Heading
                                variant="small"
                                title="Team settings"
                                description="Update your team name and settings"
                            />

                            <Form
                                action={route('teams.update', team.id)}
                                method="patch"
                                className="space-y-6"
                            >
                                {({ errors, processing }) => (
                                    <>
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">
                                                Team name
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                data-test="team-name-input"
                                                defaultValue={team.name}
                                                required
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <Button
                                                type="submit"
                                                data-test="team-save-button"
                                                disabled={processing}
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </>
                    ) : (
                        <>
                            <Heading variant="small" title={team.name} />
                        </>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <Heading
                            variant="small"
                            title="Team members"
                            description={
                                canManageTeam
                                    ? 'Manage who belongs to this team'
                                    : ''
                            }
                        />

                        {canManageTeam ? (
                            <Button
                                data-test="invite-member-button"
                                onClick={() => setInviteDialogOpen(true)}
                            >
                                <UserPlus /> Invite member
                            </Button>
                        ) : null}
                    </div>

                    <div className="space-y-3">
                        {members.map((member) => (
                            <div
                                key={member.id}
                                data-test="member-row"
                                className="flex items-center justify-between rounded-lg border p-4"
                            >
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-10 w-10">
                                        {member.avatar ? (
                                            <AvatarImage
                                                src={member.avatar}
                                                alt={member.name}
                                            />
                                        ) : null}
                                        <AvatarFallback>
                                            {formatInitials(member.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">
                                            {member.name}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {member.email}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {member.role !== 'owner' &&
                                    canManageTeam ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                render={
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        data-test="member-role-trigger"
                                                    >
                                                        {member.role_label}
                                                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                                                    </Button>
                                                }
                                            />
                                            <DropdownMenuContent>
                                                {availableRoles.map((role) => (
                                                    <DropdownMenuItem
                                                        key={role.value}
                                                        data-test="member-role-option"
                                                        onSelect={() =>
                                                            updateMemberRole(
                                                                member,
                                                                role.value,
                                                            )
                                                        }
                                                    >
                                                        {role.label}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <Badge variant="secondary">
                                            {member.role_label}
                                        </Badge>
                                    )}

                                    {member.role !== 'owner' &&
                                    canManageTeam ? (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger
                                                    render={
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            data-test="member-remove-button"
                                                            onClick={() =>
                                                                confirmRemoveMember(
                                                                    member,
                                                                )
                                                            }
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    }
                                                />
                                                <TooltipContent>
                                                    <p>Remove member</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {invitations.length > 0 ? (
                    <div className="space-y-6">
                        <Heading
                            variant="small"
                            title="Pending invitations"
                            description="Invitations that haven't been accepted yet"
                        />

                        <div className="space-y-3">
                            {invitations.map((invitation) => (
                                <div
                                    key={invitation.code}
                                    data-test="invitation-row"
                                    className="flex items-center justify-between rounded-lg border p-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                            <Mail className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <div className="font-medium">
                                                {invitation.email}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {invitation.role_label}
                                            </div>
                                        </div>
                                    </div>

                                    {canManageTeam ? (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger
                                                    render={
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            data-test="invitation-cancel-button"
                                                            onClick={() =>
                                                                confirmCancelInvitation(
                                                                    invitation,
                                                                )
                                                            }
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    }
                                                />
                                                <TooltipContent>
                                                    <p>Cancel invitation</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}

                {canManageTeam ? (
                    <div className="space-y-6">
                        <Heading
                            variant="small"
                            title="Delete team"
                            description="Permanently delete your team"
                        />
                        <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                            <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                                <p className="font-medium">Warning</p>
                                <p className="text-sm">
                                    Please proceed with caution, this cannot be
                                    undone.
                                </p>
                            </div>
                            <Button
                                variant="destructive"
                                data-test="delete-team-button"
                                onClick={() => setDeleteDialogOpen(true)}
                            >
                                Delete team
                            </Button>
                        </div>
                    </div>
                ) : null}
            </div>

            {canManageTeam ? (
                <InviteMemberModal
                    team={team}
                    availableRoles={availableRoles}
                    open={inviteDialogOpen}
                    onOpenChange={setInviteDialogOpen}
                />
            ) : null}

            <RemoveMemberModal
                team={team}
                member={memberToRemove}
                open={removeMemberDialogOpen}
                onOpenChange={setRemoveMemberDialogOpen}
            />

            <CancelInvitationModal
                team={team}
                invitation={invitationToCancel}
                open={cancelInvitationDialogOpen}
                onOpenChange={setCancelInvitationDialogOpen}
            />

            {canManageTeam ? (
                <DeleteTeamModal
                    team={team}
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                />
            ) : null}
        </SettingsLayout>
    );
};

export default TeamEdit;
