import { Image, Flex, Button, HStack, chakra } from '@chakra-ui/react'
import Logo from '../public/logo.svg'
import { Link } from 'react-scroll'
import MobileDrawer from './MobileDrawer'
import { NavItem } from './MobileDrawer'

//Edit Later TODO
let data: NavItem[] = [{ label: "Create Team" }, { label: "Join Team" }, { label: "View Teams" }, { label: "Matches" }, { label: "Ratings" }];

const CTA = "Get Started"

export default function Header() {
    return (
        <chakra.header id="header">
            <Flex
                w="100%"
                px="6"
                py="5"
                align="center"
                justify="space-between"
            >
                {/* Logo */}
                <Image src={Logo.src} h="50px" />

                {/* Nav Items */}
                <HStack display={{ base: "none", md: "flex" }} as="nav" spacing="5">
                    {data.map((item, i) => (
                        <Link key={i} to={''}>
                            <Button variant="nav"> {item.label} </Button>
                        </Link>
                    ))}
                </HStack>
                {/*  invoke action items*/}
                <HStack>
                    <Button>
                        {CTA}
                    </Button>
                </HStack>
                <HStack>
                    <Button aria-label={CTA} variant="outline">
                        {CTA}
                    </Button>
                    <MobileDrawer data={data} />
                </HStack>
            </Flex>
        </chakra.header>
    );
}