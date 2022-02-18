import Header from "../../components/navbarComponents/Desktop"

interface AuthLayoutProps {
    children?: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <>
            <main>{ children || <></> }</main>
        </>
    )
}
