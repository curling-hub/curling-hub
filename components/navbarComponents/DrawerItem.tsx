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
  btnRef: any;
  title?: string;
  footer?: React.ReactNode;
}

export default function DrawerExample({
  placement = "right",
  //width,
  isOpen,
  children,
  onClose,
  btnRef,
  title = "Menu",
  footer = (<></>),
}: DrawerExampleProps) {
  const p = 15
  return (
    <Flex>
      <Drawer
        isOpen={isOpen}
        placement={placement}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent alignItems="center">
          <DrawerCloseButton alignSelf="end" mx={p} my={p} />
          <DrawerHeader my={p}>
            <Text as="p"> {title} </Text>
          </DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
          <DrawerFooter>{footer}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}