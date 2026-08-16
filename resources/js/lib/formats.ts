import type { TTeamRole } from '@/types/enums';

export const formatInitials = (fullName: string | null | undefined): string => {
    if (!fullName) return '';
    const names = fullName.trim().split(/\s+/u).filter(Boolean);
    if (names.length === 0) return '';
    const firstInitial = Array.from(names[0])[0] ?? '';
    let lastInitial = '';
    if (names.length > 1)
        lastInitial = Array.from(names[names.length - 1])[0] ?? '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
};

export const formatRoleLabel = (role: TTeamRole | null | undefined): string => {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1);
};
