import Header from "../navbarComponents/Navbar"
import { NavItem } from '../../components/navbarComponents/MobileDrawer'

interface AuthLayoutProps {
    children?: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <>
            <Header />
            <main>{children || <></>}</main>
        </>
    )
}