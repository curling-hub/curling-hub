import { Image, Flex, Button, HStack, chakra, Spacer, Box } from '@chakra-ui/react'
import Link from 'next/link'
import MobileDrawer, { NavItem } from './MobileDrawer'

interface NavbarProps {
    navItems?: NavItem[];
    navAnchor?: NavItem;
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
                <Link href="/">
                    <a>
                        <Image src="/curloLogo1.svg" w="100px" h="40px" mr="8px" />
                    </a>
                </Link>

                {/* Nav Items */}
                {navItems && <HStack display={{ base: "none", md: "flex" }} as="nav" spacing="1">
                    {navItems.map((item: NavItem, i: number) => (
                        <Link key={i} href={item.link}>
                            <Button
                                variant="nav"
                                color="primary.black"
                                style={{ fontSize: 18, fontWeight: '500' }}
                                _hover={{ bg: "primary.white" }}
                            >
                                {item.label}
                            </Button>
                        </Link>
                    ))}
                </HStack>}
                <Spacer />
                {/* invoke action items */}
                <Flex>
                    {navAnchor && <Box>
                        <Link href={navAnchor.link}>
                            <Button
                                aria-label={navAnchor.label}
                                variant="outline"
                                color="primary.black"
                                bg="primary.white"
                                _hover={{ bg: 'primary.gray' }}
                            >
                                {navAnchor.label}
                            </Button>
                        </Link>
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

