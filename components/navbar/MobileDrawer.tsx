import { useDisclosure, Flex, Box, Button, VStack, Icon, HStack, Link as ChakraLink } from "@chakra-ui/react";
import Drawer from './DrawerItem';
import { HamburgerIcon } from "@chakra-ui/icons"
// import { Link } from 'react-scroll'
import Link from 'next/link'
import React from "react";

export interface NavItem {
    label: string;
    link: string;
}

interface MobileDrawerProps {
    data: NavItem[];
}

export default function MobileDrawer({ data }: MobileDrawerProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    return (
        <Flex display={{ base: "flex", md: "none" }}>
            {/* Menu button */}
            {/*<Button ref={btnRef} onClick={onOpen}>*/}
            <Button onClick={onOpen}>
                <HamburgerIcon w={26} h={26} />
            </Button>

            {/* Drawer component */}
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
            >
                <VStack alignItems="left">
                    {data.map((item, i) => (
                        <Link key={i} href="/">
                            <Button variant='text'> {item.label} </Button>
                        </Link>
                    ))}
                </VStack>
            </Drawer>
        </Flex>
    );
}
