import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Center,
    Text,
    OrderedList,
    ListItem,
    VStack,
} from '@chakra-ui/react'

interface HostInfoModalProps {
    isOpen?: boolean
    onClose?: () => void
    name: string
    email: string | undefined
    phoneNumber: string
    website: string | undefined
}

export default function HostInfoModal(props: HostInfoModalProps) {
    const { isOpen = false, onClose = (() => { }) } = props
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside' size='lg'>
                <ModalContent h="200px" w={{ base: '350px', md: '500px', lg: '650px' }} mt="105px" bg="primary.white" borderRadius="20" shadow="dark-lg">
                    <ModalHeader>
                        <Center fontSize='xl' fontWeight='semibold'>
                            {props.name}
                        </Center>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} mx="15px">
                        <VStack>
                            <Text>{props.phoneNumber}</Text>
                            <Text>{props.email}</Text>
                            <Text>{props.website}</Text>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}