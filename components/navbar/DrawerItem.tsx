import {
    Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent,
    DrawerCloseButton, Flex, Text,
} from "@chakra-ui/react";

interface DrawerExampleProps {
    placement?: any;     // chakra-ui DrawerPlacement
    // width: number;
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    title?: string;
    footer?: React.ReactNode;
}

export default function DrawerExample({
    placement = "right",
    //width,
    isOpen,
    children,
    onClose,
    title = "Menu",
    footer = undefined,
}: DrawerExampleProps) {
    const p = 15
    return (
        <Flex>
            {/* Chakra drawer can't be rendered on server side, so only render on client (browser) */}
            {process.browser && (
                <Drawer
                    isOpen={isOpen}
                    placement={placement}
                    onClose={onClose}
                >
                    <DrawerOverlay />
                    <DrawerContent alignItems="center">
                        <DrawerCloseButton alignSelf="end" mx={p} my={p} />
                        <DrawerHeader my={p}>
                            <Text as="p"> {title} </Text>
                        </DrawerHeader>
                        <DrawerBody>{children}</DrawerBody>
                        <DrawerFooter>{footer || <></>}</DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )}
        </Flex>
    );
}
