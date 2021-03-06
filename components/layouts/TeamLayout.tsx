import Header, { LogoutButton } from "../navbar/Navbar"
import { NavItem } from '../navbar/MobileDrawer'

interface TeamLayoutProps {
    teamId?: number | null;
    children?: React.ReactNode;
}

export default function TeamLayout(props: TeamLayoutProps) {
    const { children, teamId } = props
    const navItems = getNavItems(teamId)
    const navAnchor = getNavAnchor()
    return (
        <>
            <Header navItems={navItems} navAnchor={navAnchor} />
            <main>{children || <></>}</main>
        </>
    )
}

const getNavAnchor = () => LogoutButton

function getNavItems(teamId?: number | null): NavItem[] {
    const data: NavItem[] = [
        {
            label: "My Team",
            link: teamId ? `/teams/${teamId}/profile` : '/',
        },
        {
            label: "Add Match",
            link: teamId ? `/teams/${teamId}/add-match` : '/',
        },
        {
            label: "Matches",
            link: teamId ? `/teams/${teamId}/matches` : '/',
        },
        {
            label: "Ratings",
            link: '/ratings',
        },
    ]
    return data
}
