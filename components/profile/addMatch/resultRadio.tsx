import {
    Box,
    Radio,
    useRadio,
    UseRadioProps,
} from '@chakra-ui/react'


interface ResultRadioProps {
    children?: React.ReactNode
}

const ResultRadio = (props: ResultRadioProps & UseRadioProps): JSX.Element => {
    const { children = <></> } = props
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const inputProps = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as="label">
            <input {...inputProps} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="full"
                boxShadow="md"
                _checked={{
                    bg: "gray.200",
                    fontWeight: "medium",
                    borderColor: "gray.200",
                }}
                _focus={{
                    fontWeight: "medium",
                    boxShadow: "outline",
                }}
                px={5}
                py={1}
            >
                {children}
            </Box>
        </Box>
    )
}


export default ResultRadio
