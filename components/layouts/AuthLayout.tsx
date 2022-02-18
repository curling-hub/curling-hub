import Header from "../../components/navbarComponents/Navbar"

interface AuthLayoutProps {
    children?: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <>
            <main>{children || <></>}</main>
        </>
    )
}
