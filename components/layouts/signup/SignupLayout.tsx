import { Image, Center, Box } from '@chakra-ui/react'
import theme from '../../../themes/colors'

interface SignupLayoutProps {
    children?: React.ReactNode;
}

export default function SignupLayout(props: SignupLayoutProps) {

    return (
        <>
            <Box
                position="absolute"
                top="126px"
                left="0"
                right="0"
                margin="auto"
                maxWidth="967px"
                width={"90%"}
                height="612px"
                borderRadius="35px"
                background={theme.colors.primary.white}
            >
                <Box

                    position="absolute"
                    left="0"
                    maxWidth="402px"
                    width="41.5%"

                    height="612px"
                    borderRadius="35px"
                    background={'linear-gradient(169.16deg, ' + theme.colors.primary.white + ' 8.04%,' + theme.colors.primary.green + ' 95.82%)'}
                >

                    <Image
                        src="/curlo_Logo.svg"
                        w="243px"
                        h="196px"
                        style={{
                            position: "absolute",
                            left: "0",
                            right: "0",
                            margin: "auto",
                            bottom: "60px"
                        }}
                    />
                </Box>
                <Center
                    width={["58.4%", "58.4%", "58.4%", "58.4%", "58.4%"]}
                    maxWidth={["565px", "565px", "565px", "565px"]}
                    style={{
                        position: "absolute",
                        maxWidth: "565px", // 967 - (left div width)
                        height: "612px",
                        right: "0"
                    }}>
                    {props.children || <></>}
                </Center>
            </Box>
        </>
    );
}