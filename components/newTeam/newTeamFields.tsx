import NextLink from 'next/link'
import { useState } from 'react'
import {
    Link as ChakraLink,
    Input,
    Stack,
    VStack,
    HStack,
    Button,
    Radio,
    RadioGroup,
    Select,
    Text,
    Checkbox
} from '@chakra-ui/react'

interface NewTeamFieldsProps {
    onOpenPrivacyPolicy: () => void;
    onOpenTermsOfService: () => void;
}

export default function NewTeamFields(props: NewTeamFieldsProps) {
    const {
        onOpenPrivacyPolicy,
        onOpenTermsOfService
    } = props

    const [mode, setMode] = useState(true)
    const [alternate, setAlternate] = useState(false)
    const modeMap = new Map<boolean, string>([
        [true, "classic"],
        [false, "doubles"]
    ])

    return (
        <VStack alignItems="center" spacing="4">
            <Input
                borderRadius="full"
                focusBorderColor="green.400"
                shadow="sm"
                placeholder="Team Name"
            />
            <RadioGroup onChange={() => setMode(!mode)} value={modeMap.get(mode)}>
                <Stack direction="row" alignItems="right">
                    <Radio colorScheme="green" value="classic">Classic</Radio>
                    <Radio colorScheme="green" value="doubles">Doubles</Radio>
                </Stack>
            </RadioGroup>
            <Input
                borderRadius="full"
                focusBorderColor="green.400"
                shadow="sm"
                placeholder="Curler One"
            />
            <Input
                borderRadius="full"
                focusBorderColor="green.400"
                shadow="sm"
                placeholder="Curler Two"
                />
            { mode && 
                <>
                    <Input
                        borderRadius="full"
                        focusBorderColor="green.400"
                        shadow="sm"
                        placeholder="Curler Three"
                    />
                    <Input
                        borderRadius="full"
                        focusBorderColor="green.400"
                        shadow="sm"
                        placeholder="Curler Four"
                    />
                    {alternate ? 
                        <>
                            <Input
                                borderRadius="full"
                                focusBorderColor="green.400"
                                shadow="sm"
                                placeholder="Alternate"
                            />
                            <Button onClick={() => setAlternate(!alternate)} variant="link" color="black" size="xs">
                                Remove Alternate
                            </Button>
                        </>
                    : 
                        <Button onClick={() => setAlternate(!alternate)} variant="link" color="black" size="xs">
                            Add Alternate
                        </Button>
                    }
                </>
            }
            <Select
                // TODO: POPULATE CATEGORIES VIA SERVER SIDE RENDER. SEE JIRA BOARD FOR DETAILS.
                borderRadius="full"
                placeholder="Select Categories..."
            >
            </Select>
            <HStack>
                <Checkbox
                    aria-label=""
                    size="sm"
                    borderRadius="50%"
                    colorScheme="teal"
                    css={`
                        > span:first-of-type {
                            box-shadow: unset;
                        }
                    `}
                />
                <Text fontSize="12">
                {" "}I agree to the {" "}
                <Button variant="link" size="12" onClick={onOpenTermsOfService}>
                    Terms of Service
                </Button>
                {" "}and{" "}
                <Button variant="link" size="12" onClick={onOpenPrivacyPolicy}>
                    Privacy Policy
                </Button>
                </Text>
            </HStack>
            <Button
                type='submit'
                isFullWidth
                bg="primary.green"
                borderRadius="full"
                boxShadow="md"
                _hover={{ bg: "green.400" }}
                _active={{ bg: "green.600" }}
                _focus={{ boxShadow: "lg" }}
            >
                Create Account
            </Button>
        </VStack>
    )
}