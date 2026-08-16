import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

import type { TTeam } from '@/types/models';

import { useState } from 'react';

import { Link } from '@inertiajs/react';
import { Eye, LogOut, Pencil, Plus } from 'lucide-react';
import { CreateTeamModal } from '@/components/layouts/app-layout/create-team-modal';
import { Heading } from '@/components/elements/heading';
import { LeaveTeamModal } from '@/components/layouts/app-layout/leave-team-modal';
import { Button } from '@/components/ui/button';
import { SettingsLayout } from '@/components/layouts/settings-layout';

const TeamsIndex = ({ teams }: { teams: TTeam[] }) => {
    const [leaveTeamDialogOpen, setLeaveTeamDialogOpen] = useState(false);
    const [teamLeaving, setTeamLeaving] = useState<TTeam | null>(null);

    const openLeaveTeamDialog = (team: TTeam) => {
        setTeamLeaving(team);
        setLeaveTeamDialogOpen(true);
    };

    return (
        <SettingsLayout
            title="Teams"
            description="Manage your teams and team memberships"
        >
            <h1 className="sr-only">Teams</h1>

            <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                    <Heading
                        variant="small"
                        title="Teams"
                        description="Manage your teams and team memberships"
                    />

                    <CreateTeamModal>
                        <Button data-test="teams-new-team-button">
                            <Plus /> New team
                        </Button>
                    </CreateTeamModal>
                </div>

                <div className="space-y-3">
                    {teams.map((team) => {
                        const canLeaveTeam = team.role !== 'owner';

                        return (
                            <div
                                key={team.id}
                                data-test="team-row"
                                className="flex items-center justify-between gap-4 rounded-lg border p-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                {team.name}
                                            </span>
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {team.roleLabel}
                                        </span>
                                    </div>
                                </div>

                                <TooltipProvider>
                                    <div className="flex items-center gap-2">
                                        {canLeaveTeam ? (
                                            <Tooltip>
                                                <TooltipTrigger
                                                    render={
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            data-test="team-leave-button"
                                                            onClick={() =>
                                                                openLeaveTeamDialog(
                                                                    team,
                                                                )
                                                            }
                                                        >
                                                            <LogOut className="h-4 w-4" />
                                                        </Button>
                                                    }
                                                />
                                                <TooltipContent>
                                                    <p>Leave team</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        ) : null}

                                        {team.role === 'member' ? (
                                            <Tooltip>
                                                <TooltipTrigger
                                                    render={
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            data-test="team-view-button"
                                                            render={
                                                                <Link
                                                                    href={route(
                                                                        'teams.edit',
                                                                        team.id,
                                                                    )}
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </Link>
                                                            }
                                                        />
                                                    }
                                                />
                                                <TooltipContent>
                                                    <p>View team</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip>
                                                <TooltipTrigger
                                                    render={
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            data-test="team-edit-button"
                                                            render={
                                                                <Link
                                                                    href={route(
                                                                        'teams.edit',
                                                                        team.id,
                                                                    )}
                                                                >
                                                                    <Pencil className="h-4 w-4" />
                                                                </Link>
                                                            }
                                                        />
                                                    }
                                                />
                                                <TooltipContent>
                                                    <p>Edit team</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        )}
                                    </div>
                                </TooltipProvider>
                            </div>
                        );
                    })}

                    {teams.length === 0 ? (
                        <p className="py-8 text-center text-muted-foreground">
                            You don't belong to any teams yet.
                        </p>
                    ) : null}
                </div>
            </div>

            <LeaveTeamModal
                team={teamLeaving}
                open={leaveTeamDialogOpen}
                onOpenChange={setLeaveTeamDialogOpen}
            />
        </SettingsLayout>
    );
};

export default TeamsIndex;
