import Header, { LogoutButton } from "../navbar/Navbar"
import { NavItem } from '../navbar/MobileDrawer'

interface HostLayoutProps {
    hostId?: number | null;
    children?: React.ReactNode;
}

export default function HostLayout(props: HostLayoutProps) {
    const { children, hostId } = props
    const navItems = getNavItems(hostId)
    const navAnchor = getNavAnchor()
    return (
        <>
            <Header navItems={navItems} navAnchor={navAnchor} />
            <main>{children || <></>}</main>
        </>
    )
}

const getNavAnchor = () => LogoutButton

function getNavItems(hostId?: number | null): NavItem[] {
    const data: NavItem[] = [
        {
            label: "Profile",
            link: hostId ? `/hosts/${hostId}/profile` : '/',
        },
        {
            label: "Add Match",
            link: hostId ? `/hosts/${hostId}/add-match` : '/',
        },
        {
            label: "Ratings",
            link: '/ratings',
        },
    ]
    return data
}
