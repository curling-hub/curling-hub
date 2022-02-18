import { Image, Flex, Button, HStack, chakra, Spacer, Box } from '@chakra-ui/react'
import Link from 'next/link'
import MobileDrawer, { NavItem } from './MobileDrawer'

interface NavbarProps {
    navItems: NavItem[];
    navAnchor: NavItem;
}


export default function Header({ navItems, navAnchor }: NavbarProps) {
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
                {<Image src="/curloLogo1.svg" w="108px" h="16px" mr="8px" />}

                {/* Nav Items */}
                <HStack display={{ base: "none", md: "flex" }} as="nav" spacing="2">
                    {navItems.map((item, i) => (
                        <Link key={i} href={item.link}>
                            <Button variant="nav"> {item.label} </Button>
                        </Link>
                    ))}
                </HStack>
                <Spacer />
                {/* invoke action items */}
                <Flex>
                    <Box px='2'>
                        <Button aria-label={navAnchor.label} variant="outline">
                            {navAnchor.label}
                        </Button>
                    </Box>
                    <Box>
                        <MobileDrawer data={navItems} />
                    </Box>
                </Flex>
            </Flex>
        </chakra.header>
    );
}
