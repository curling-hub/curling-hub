import Header from "../navbar/Navbar"
import { NavItem } from '../navbar/MobileDrawer'

interface LayoutProps {
    children?: React.ReactNode;
}

export default function UserLayout({ children }: LayoutProps) {
    const navItems = getNavItems()
    const navAnchor = getNavAnchor()
    return (
        <>
            <Header navItems={navItems} navAnchor={navAnchor} />
            <main>{children || <></>}</main>
        </>
    )
}

function getNavAnchor(): NavItem {
    return {
        label: 'My Account',
        link: '/',
    }
}

function getNavItems(): NavItem[] {
    const data: NavItem[] = [
        {
            label: "Create Team",
            link: '/teams/create',
        },
        {
            label: "Join Team",
            link: '/teams/join',
        },
        {
            label: "View Teams",
            link: '/teams/view',
        },
        {
            label: "Matches",
            link: '/matches',
        },
        {
            label: "Ratings",
            link: '/ratings',
        },
    ]
    return data
}
