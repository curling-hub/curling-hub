import Header from "../navbarComponents/Navbar"
import { NavItem } from '../navbarComponents/MobileDrawer'

interface StandardLayoutProps {
    children?: React.ReactNode;
}

export default function StandardLayout({ children }: StandardLayoutProps) {
    return (
        <>
            <Header navItems={[]} navAnchor={{ label: 'Log In', link: '/login' }} />
            <main>{children || <></>}</main>
        </>
    )
}