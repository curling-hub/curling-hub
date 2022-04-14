import Header from "../navbar/Navbar"
import { Box, BoxProps } from "@chakra-ui/react"
import { NavItem } from '../navbar/MobileDrawer'

interface AuthLayoutProps {
    children?: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <>
            <Header />
            <main style={{
                height: '10px',
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