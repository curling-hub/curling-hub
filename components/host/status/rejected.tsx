import Image from 'next/image'
import {
    Container,
    Text,
    VStack,
} from '@chakra-ui/react'

const HostRejected = (): JSX.Element => {
    return (
        <>
            <Container
                maxW="md"
                borderRadius={12}
                bgColor="white"
                px={8}
                py={4}
            >
                <VStack>
                    <Text fontSize={24} fontWeight="bold" textAlign="center">
                        Sorry, your account application was rejected. Please email us
                        if you have any questions about this decision.
                    </Text>
                    <Image src="/curloLogo2.svg" alt="Curlo Logo" width="100%" height="100%" />
                </VStack>
            </Container>
        </>
    )
}

export default HostRejected
