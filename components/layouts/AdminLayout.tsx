import Header, { LogoutButton } from "../navbar/Navbar"
import { NavItem } from '../navbar/MobileDrawer'

interface LayoutProps {
    children?: React.ReactNode;
}

export default function AdminLayout({ children }: LayoutProps) {
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
            label: "Requests",
            link: '/admin-requests',
        },
        {
            label: "Glicko",
            link: '/glicko',
        },
        {
            label: "Ratings",
            link: '/ratings',
        }
    ]
    return data
}
