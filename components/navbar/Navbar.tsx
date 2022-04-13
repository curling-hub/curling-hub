import { Image, Flex, Button, HStack, chakra, Spacer, Box } from '@chakra-ui/react'
import Link from 'next/link'
import { signIn, signOut } from 'next-auth/react'
import MobileDrawer, { NavItem } from './MobileDrawer'


export const LogoutButton = (
    <Button
        onClick={() => signOut({ callbackUrl: '/' })}
        aria-label="Sign out"
        variant="outline"
        color="primary.black"
        bg="primary.white"
        _hover={{ bg: 'primary.gray' }}
    >
        Logout
    </Button>
)

const createNavAnchor = (navAnchor?: NavItem | typeof LogoutButton): JSX.Element => {
    if (!navAnchor) {
        return (<></>)
    }
    if ('link' in navAnchor) {
        return (
            <Link href={navAnchor.link} passHref>
                <a>
                    <Button
                        aria-label={navAnchor.label}
                        variant="outline"
                        color="primary.black"
                        bg="primary.white"
                        _hover={{ bg: 'primary.gray' }}
                    >
                        {navAnchor.label}
                    </Button>
                </a>
            </Link>
        )
    }
    if (navAnchor === LogoutButton) {
        return navAnchor
    }
    return (<></>)
}

interface NavbarProps {
    navItems?: NavItem[];
    navAnchor?: NavItem  | typeof LogoutButton;
}


export default function Navbar({ navItems, navAnchor }: NavbarProps) {
    return (
        <chakra.header>
            <Flex
                w="100%"
                px="6"
                py="5"
                align="center"
                justify="space-between"
            >
                {/* Logo */}
                <Link href="/" passHref>
                    <a>
                        <Image src="/curloLogo1.svg" alt="Curlo logo" w="100px" h="40px" mr="8px" />
                    </a>
                </Link>

                {/* Nav Items */}
                {navItems && <HStack display={{ base: "none", md: "flex" }} as="nav" spacing="1">
                    {navItems.map((item: NavItem, i: number) => (
                        <Link key={i} href={item.link} passHref>
                            <a>
                                <Button
                                    variant="nav"
                                    color="primary.black"
                                    style={{ fontSize: 18, fontWeight: 500 }}
                                    _hover={{ bg: "primary.white" }}
                                >
                                    {item.label}
                                </Button>
                            </a>
                        </Link>
                    ))}
                </HStack>}
                <Spacer />
                {/* invoke action items */}
                <Flex>
                    {navAnchor && <Box>
                        {createNavAnchor(navAnchor)}
                    </Box>}
                    {/* Mobile only */}
                    {navItems && <Box ml="2" display={{ md: "none" }}>
                        <MobileDrawer data={navItems} />
                    </Box>}
                </Flex>
            </Flex>
        </chakra.header>
    );
}

