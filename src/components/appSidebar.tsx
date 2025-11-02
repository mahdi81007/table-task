import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const sidebarItems = [
    {
        label: "Home",
        href: '/',
        id: 1
    },
    {
        label: "Users",
        href: '/users',
        id: 2
    },
    {
        label: "Posts",
        href: '/posts',
        id: 3
    }
]

export function AppSidebar() {

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>pages</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                sidebarItems.map((item: any) => (
                                    <SidebarMenuItem id={item.id}>
                                        <SidebarMenuButton asChild>
                                            <a className={'pointer'} href={item.href}>
                                                {item.label}
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}