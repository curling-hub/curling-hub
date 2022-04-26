import Header from "../navbar/Navbar"
import { NavItem } from '../navbar/MobileDrawer'

interface StandardLayoutProps {
    children?: React.ReactNode;
}

export default function StandardLayout({ children }: StandardLayoutProps) {
    return (
        <>
            <Header navAnchor={{ label: 'Log In', link: '/login' }} />
            <main>{children || <></>}</main>
        </>
    )
}