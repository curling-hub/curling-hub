import Header from "../navbarComponents/Navbar"
import { Box, BoxProps } from "@chakra-ui/react"
import { NavItem } from '../../components/navbarComponents/MobileDrawer'

interface AuthLayoutProps {
    children?: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <>
            <Header />
            <main style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                    {children || <></>}
            </main>
        </>
    )
}