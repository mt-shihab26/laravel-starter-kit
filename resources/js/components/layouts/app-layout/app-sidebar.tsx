import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { useSidebar } from '@/components/ui/sidebar';
import { mainNavItems, secondNavItems } from '@/lib/links';
import { cn } from '@/lib/utils';

import { Link } from '@inertiajs/react';
import { PanelLeftIcon } from 'lucide-react';
import { AppLogo } from './app-logo';
import { NavFooter } from './nav-footer';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

export const AppSidebar = () => {
    const { open, toggleSidebar } = useSidebar();

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')}>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={secondNavItems} className="mt-auto" />
                <NavUser />
                <SidebarMenu className="">
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className="cursor-pointer"
                            data-sidebar="trigger"
                            data-slot="sidebar-trigger"
                            tooltip="Expande"
                            onClick={toggleSidebar}
                        >
                            <PanelLeftIcon className={cn({ 'ml-1.5': open })} />
                            <span v-if="state === 'expanded'">Collapse</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};
