import type { TTeamRole } from './enums';

export type TUser = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
};

export type TTeam = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

export type TTeamMember = {
    id: number;
    team_id: number;
    user_id: number;
    role: TTeamRole;
    created_at: string;
    updated_at: string;
};

export type TTeamInvitation = {
    id: number;
    code: string;
    team_id: number;
    email: string;
    role: TTeamRole;
    invited_by: number;
    expires_at: string | null;
    accepted_at: string | null;
    created_at: string;
    updated_at: string;
};
