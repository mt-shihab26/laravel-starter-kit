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
    isPersonal: boolean;
    role?: TTeamRole;
    roleLabel?: string;
    isCurrent?: boolean;
};

export type TTeamInvitation = {
    code: string;
    email: string;
    role: TTeamRole;
    role_label: string;
    created_at: string;
};

export type TTeamMember = {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
    role: TTeamRole;
    role_label: string;
};
