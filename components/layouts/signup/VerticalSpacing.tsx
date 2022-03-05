import { VStack } from '@chakra-ui/react'


interface VerticalSpacingProps {
    children?: React.ReactNode;
}

export default function SignupLayout({ children }: VerticalSpacingProps) {
    return (
        <>
            <VStack
                spacing='30px'
                w="73%"
                h="83%"
                ml="5%"
            >
                {children || <></>}
            </VStack>
        </>
    );
}