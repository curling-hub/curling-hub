import Header from "../../components/navbarComponents/Desktop"

interface LayoutProps {
    children?: React.ReactNode;
}

export default function UserLayout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <main>{ children || <></> }</main>
        </>
    )
}
