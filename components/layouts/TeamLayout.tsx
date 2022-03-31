import Header from "../navbar/Navbar"
import { NavItem } from '../navbar/MobileDrawer'

interface LayoutProps {
    children?: React.ReactNode;
}

export default function TeamLayout({ children }: LayoutProps) {
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
        label: 'Logout',
        link: '/',
    }
}

function getNavItems(): NavItem[] {
    const data: NavItem[] = [
        {
            label: "My Team",
            link: '/team-profile',
        },
        {
            label: "Add Match",
            link: '/team-add-match',
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
