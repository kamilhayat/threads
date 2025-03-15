import { Activity, House, Search, User } from 'lucide-react';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { RiCommunityLine } from 'react-icons/ri';

export const sidebarLinks = [
    {
        icon: House,
        route: "/",
        label: "Home",
    },
    {
        icon: Search,
        route: "/search",
        label: "Search",
    },
    {
        icon: Activity,
        route: "/activity",
        label: "Activity",
    },
    {
        icon: MdOutlineCreateNewFolder,
        route: "/create-thread",
        label: "Create Thread",
    },
    {
        icon: RiCommunityLine,
        route: "/communities",
        label: "Communities",
    },
    {
        icon: User,
        route: "/profile",
        label: "Profile",
    },
];

export const profileTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "replies", label: "Replies", icon: "/assets/members.svg" },
    { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
    { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];