import {
    Box,
    Container,
} from '@chakra-ui/react'


interface AddMatchProps {
    children?: React.ReactNode
}

const AddMatch = (props: AddMatchProps): JSX.Element => {
    const { children = <></> } = props
    return (
        <Container maxW="2xl" centerContent>
            <Box
                minW="sm"
                maxW={{base: "sm", md: "none"}}
                w="100%"
                h="auto"
                borderRadius="20"
                bg="white"
            >
                <Box minW="sm" w="100%" h="100%" m={{ base: 0, md: 2 }} p={10} borderRadius="32">
                    {children}
                </Box>
            </Box>
        </Container>
    )
}

export default AddMatch
