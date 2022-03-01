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

interface PrivacyPolicyModalProps {
    isOpen?: boolean
    onClose?: () => void
}

export default function PrivacyPolicyModal(props: PrivacyPolicyModalProps) {
    const { isOpen = false, onClose = (() => { }) } = props
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside' size='lg'>
                <ModalContent h="360px" w={{ base: '350px', md: '500px', lg: '650px' }} mt="105px" bg="primary.white" borderRadius="20" shadow="dark-lg">
                    <ModalHeader>
                        <Center fontSize='3xl' fontWeight='bold'>
                            Privacy Policy
                        </Center>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} mx="15px">
                        <Text fontSize='xs' fontWeight='semibold'>
                            We value your privacy and strive to protect your personal information. Please read this Policy to understand what types of information we collect from you, for what purposes and what choices you have regarding our collection of your information. This policy covers the Curlo website. By accessing, using or posting information to this Website, you agree to this Privacy Policy.
                            We collect several types of information from and about you, including:
                            <OrderedList>
                                <ListItem>
                                    Your email address and password. We treat this information as "Personally Identifiable Information" or "PII". We never store passwords in plain text format, only secure password hashes.
                                </ListItem>
                                <ListItem>
                                    Non-personally identifiable information, such as demographic information about you, information about your computer system or device, your preferences, your online activity, and your location information ("Non-Personally Identifiable Information" a "Non-PII"). Non-PII, by itself, does not identify you, but it can be combined with other information in a way that allows you to be identified. If this happens, we will treat the combined information as PII.
                                </ListItem>
                                <ListItem>
                                    Specific to users of Curlo, we (optionally) collect personal information such as your gender, data of birth, and other information required for computation, analysis and display of Curlo ratings.
                                    We may collect information from or about you in the following ways:
                                    Information Provided by You. We collect information provided by you when you create your profile or use Curlo services.
                                    We do not sell, rent, or lease any of your personal information to third parties without your explicit consent.
                                </ListItem>
                            </OrderedList>
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
