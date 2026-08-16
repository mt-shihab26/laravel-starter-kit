import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { usePage } from '@inertiajs/react';
import { mainNavItems, secondaryNavItems } from '@/lib/links';

import { Link } from '@inertiajs/react';
import { AppLogo } from '@/components/layouts/app-layout/app-logo';
import { NavFooter } from '@/components/layouts/app-layout/nav-footer';
import { NavMain } from '@/components/layouts/app-layout/nav-main';
import { NavUser } from '@/components/layouts/app-layout/nav-user';
import { TeamSwitcher } from '@/components/layouts/app-layout/team-switcher';

export const AppSidebar = () => {
    const { currentTeam } = usePage().props.auth;

    const dashboardUrl = currentTeam
        ? route('dashboard', { team: currentTeam.id })
        : '/';

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            render={
                                <Link href={dashboardUrl} prefetch>
                                    <AppLogo />
                                </Link>
                            }
                        />
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <TeamSwitcher />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems(currentTeam)} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={secondaryNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
};
