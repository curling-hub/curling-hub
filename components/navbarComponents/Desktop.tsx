import { Image, Flex, Button, HStack, chakra, Spacer, Box } from '@chakra-ui/react'
import Link from 'next/link'
import MobileDrawer, { NavItem } from './MobileDrawer'

const CTA = "Get Started"

export default function Header() {
    // TODO: lift data out of Header
    const data: NavItem[] = [{ label: "Create Team" }, { label: "Join Team" }, { label: "View Teams" }, { label: "Matches" }, { label: "Ratings" }];

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
                {<Image src="/vercel.svg" w="72px" h="16px" mr="8px" />}

                {/* Nav Items */}
                <HStack display={{ base: "none", md: "flex" }} as="nav" spacing="2">
                    {data.map((item, i) => (
                        <Link key={i} href="/">
                            <Button variant="nav"> {item.label} </Button>
                        </Link>
                    ))}
                </HStack>
                <Spacer />
                {/* invoke action items */}
                <Flex>
                    <Box px='2'>
                        <Button aria-label={CTA} variant="outline">
                            {CTA}
                        </Button>
                    </Box>
                    <Box>
                        <MobileDrawer data={data} />
                    </Box>
                </Flex>
            </Flex>
        </chakra.header>
    );
}
