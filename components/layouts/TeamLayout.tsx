interface TeamLayoutProps {
    children?: React.ReactNode;
}

export default function TeamLayout({ children }: TeamLayoutProps) {
    return (
        <>
            <main>{ children || <></> }</main>
        </>
    )
}
