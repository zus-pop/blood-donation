import {
  IconBrandBlogger,
  IconCamera,
  IconCategory,
  IconDatabase,
  IconDropletMinus,
  IconDropletPlus,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Droplets } from "lucide-react";
import { Link } from "react-router";
import { useProfileStore } from "../store/profileStore";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "User Management",
      url: "users",
      icon: IconUser,
    },
    {
      title: "Donation Event",
      url: "donationevent",
      icon: IconDropletPlus,
    },
    {
      title: "Blood Requests",
      url: "bloodrequests",
      icon: IconDropletMinus,
    },
    {
      title: "Participations",
      url: "participation",
      icon: IconListDetails,
    },
    {
      title: "Onsite Check",
      url: "onsitecheck",
      icon: IconFileDescription,
    },
    {
      title: "Blood Inventory",
      url: "blood-inventory",
      icon: IconDatabase,
    },
    {
      title: "Blog",
      url: "blog",
      icon: IconBrandBlogger,
    },
    {
      title: "Category",
      url: "category",
      icon: IconCategory,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { profile } = useProfileStore();
  const [currentItem, setCurrentItem] = React.useState<string | null>(null);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/dashboard" onClick={() => setCurrentItem(null)}>
                <Droplets className="!size-8 text-sidebar-primary" />
                <span className="text-xl font-bold">Bloody</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          items={data.navMain}
        />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            email: profile ? profile.email : data.user.email,
            name: profile
              ? `${profile.firstName} ${profile.lastName}`
              : data.user.name,
            role: profile ? profile.role : "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
