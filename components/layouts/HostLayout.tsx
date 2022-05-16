import Header, { LogoutButton } from "../navbar/Navbar"
import { NavItem } from '../navbar/MobileDrawer'

interface LayoutProps {
    hostId: number;
    children?: React.ReactNode;
}

export default function HostLayout(props: LayoutProps) {
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

function getNavItems(hostId: number): NavItem[] {
    const data: NavItem[] = [
        {
            label: "Profile",
            link: `/hosts/${hostId}/profile`,
        },
        {
            label: "Add Match",
            link: `/hosts/${hostId}/add-match`,
        },
        {
            label: "Ratings",
            link: '/ratings',
        },
    ]
    return data
}
