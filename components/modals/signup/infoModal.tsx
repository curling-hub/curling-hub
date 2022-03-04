import {
    Modal,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    Text,

} from '@chakra-ui/react'

interface InfoModalProps {
    isOpen?: boolean
    onClose?: () => void
}

export default function InfoModal(props: InfoModalProps) {
    const { isOpen = false, onClose = (() => { }) } = props
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside' size='lg'>
                <ModalContent h="190
                px" w={{ base: '350px', md: '500px', lg: '650px' }} mt="105px" bg="primary.green" borderRadius="20" shadow="dark-lg">
                    <ModalCloseButton />
                    <ModalBody p={8} mx="15px">
                        <Text fontSize='2xl' fontWeight='semibold' justifyContent={"center"}>
                            Age, gender, and club are only used to help find teams that match you. This information will not be shared with anyone.
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}