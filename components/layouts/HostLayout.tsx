import Header, { LogoutButton } from "../navbar/Navbar"
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

const getNavAnchor = () => LogoutButton

function getNavItems(): NavItem[] {
    const data: NavItem[] = [
        {
            label: "Profile",
            link: '/hosts/profile',
        },
        {
            label: "Add Match",
            link: '/hosts/add-match',
        },
        {
            label: "Ratings",
            link: '/ratings',
        },
    ]
    return data
}
