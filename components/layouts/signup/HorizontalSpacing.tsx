import { HStack } from '@chakra-ui/react'


interface HorizontalSpacingProps {
    children?: React.ReactNode;
}

export default function SignupLayout({ children }: HorizontalSpacingProps) {
    return (
        <>
            <HStack
                spacing="16px"
            >
                {children || <></>}
            </HStack>
        </>
    );
}