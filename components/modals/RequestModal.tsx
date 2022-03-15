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
} from '@chakra-ui/react'

interface RequestModalProps {
    isOpen?: boolean
    onClose?: () => void
}

export default function RequestModal(props: RequestModalProps) {
    const { isOpen = false, onClose = (() => { }) } = props
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside' size='lg'>
                <ModalContent h="360px" w={{ base: '350px', md: '500px', lg: '650px' }} mt="105px" bg="primary.white" borderRadius="20" shadow="dark-lg">
                    <ModalHeader>
                        <Center fontSize='3xl' fontWeight='bold'>
                            Account Verification
                        </Center>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody align="center" pb={6} mx="15px" >
                        At Curlo, club accounts matter. We Verify
                        that every club account that is opened in
                        connected to a real club that has a curling
                        location. We ensure that our club admins
                        are real people that are inputting scores from
                        real games. <b>This process can take up to a
                            week.</b> Expect to hear from us during this
                        verification process as we verify you are
                        an administrator of the club you are
                        registered with.
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}