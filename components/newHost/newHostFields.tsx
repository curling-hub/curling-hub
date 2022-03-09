import NextLink from 'next/link'
import { signIn } from 'next-auth/react'
import StateDropdown from './StateDropdown'
import {
    Button,
    Checkbox,
    Divider,
    FormControl,
    HStack,
    Link as ChakraLink,
    Input,
    Text,
    Stack,
    VStack,
    Select,
} from '@chakra-ui/react'

interface NewHostFieldsProps {
    organization: string;
    onOrgChange: (Organization: string) => void;
    website: string;
    onWebsiteChange: (website: string) => void;
    phone: string;
    onPhoneChange: (Phone: string) => void;
    phoneType: string;
    onPhoneTypeChange: (phoneType: string) => void
    address1: string;
    onAddress1Change: (address1: string) => void;
    address2: string;
    onAddress2Change: (address2: string) => void;
    city: string;
    onCityChange: (city: string) => void;
    state: string;
    onStatechange: (state: string) => void;
    zipcode: string;
    onZipcodeChange: (zipcode: string) => void;
    country: string;
    onCountryChange: (country: string) => void;
    isAgreedPP: boolean;
    onIsAgreedPPChange: () => void;
    onOpenPrivacyPolicy: () => void;
    onOpenTermsOfService: () => void;
}

export default function NewHostFields(props: NewHostFieldsProps) {
    const {
        organization,
        onOrgChange,
        website,
        onWebsiteChange,
        phone,
        onPhoneChange,
        phoneType,
        onPhoneTypeChange,
        address1,
        onAddress1Change,
        address2,
        onAddress2Change,
        city,
        onCityChange,
        state,
        onStatechange,
        zipcode,
        onZipcodeChange,
        country,
        onCountryChange,
        isAgreedPP,
        onIsAgreedPPChange,
        onOpenPrivacyPolicy,
        onOpenTermsOfService,
    } = props

    const helperTextFontSize = "12"
    return (
        <VStack alignItems="start" spacing="4">
            <FormControl>
                <Stack>
                    <Input
                        borderRadius="full"
                        focusBorderColor="green.400"
                        shadow="sm"
                        placeholder="Organization"
                        value={organization}
                        onChange={(e) => onOrgChange(e.target.value)}
                    />
                    <Input
                        borderRadius="full"
                        focusBorderColor="green.400"
                        shadow="sm"
                        placeholder="Website"
                        value={website}
                        onChange={(e) => onWebsiteChange(e.target.value)}
                    />
                    <HStack>
                        <Input
                            // width=".75"
                            type="phone"
                            borderRadius="full"
                            focusBorderColor="green.400"
                            shadow="sm"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => onPhoneChange(e.target.value)}
                        />
                        <Select
                            // width=".5"
                            borderRadius="full"
                            placeholder='Phone'>
                            <option value={phoneType}>Home</option>
                            <option value={phoneType}>Mobile</option>
                            <option value={phoneType}>Business</option>
                        </Select>
                    </HStack>
                    <Input
                        borderRadius="full"
                        focusBorderColor="green.400"
                        shadow="sm"
                        placeholder="Street Address"
                        value={address1}
                        onChange={(e) => onAddress1Change(e.target.value)}
                    />
                    <Input
                        borderRadius="full"
                        focusBorderColor="green.400"
                        shadow="sm"
                        placeholder="Apt., Suite, Unit, etc."
                        value={address2}
                        onChange={(e) => onAddress2Change(e.target.value)}
                    />
                    <HStack>
                        <Input
                            borderRadius="full"
                            focusBorderColor="green.400"
                            shadow="sm"
                            placeholder="City"
                            value={city}
                            onChange={(e) => onCityChange(e.target.value)}

                        />
                        <StateDropdown />
                    </HStack>
                    <HStack>
                        <Input
                            borderRadius="full"
                            focusBorderColor="green.400"
                            shadow="sm"
                            placeholder="Zipcode"
                            value={zipcode}
                            onChange={(e) => onZipcodeChange(e.target.value)}
                        />
                        <Select
                            borderRadius="full"
                            placeholder='Country'>
                            <option value='USA'>USA</option>
                        </Select>
                    </HStack>
                </Stack>
            </FormControl>
            <Button
                isFullWidth
                bg="primary.green"
                borderRadius="full"
                boxShadow="md"
                _hover={{ bg: "green.400" }}
                _active={{ bg: "green.600" }}
                _focus={{ boxShadow: "lg" }}
                onClick={() => signIn("Organization", { organization })}//TODO this needs to be changed
            >
                Request Account
            </Button>
            <Divider orientation="horizontal" mt={2} width="100%" />

            <VStack w="100%" spacing="1">

                <Text fontSize={helperTextFontSize}>
                    Already have an account?{" "}
                    <NextLink href="/login" passHref>
                        <ChakraLink>Login</ChakraLink>
                    </NextLink>
                </Text>
                <Text fontSize={helperTextFontSize}>
                    <Checkbox
                        aria-label=""
                        size="sm"
                        borderRadius="50%"
                        colorScheme="teal"
                        checked={isAgreedPP}
                        css={`
                            > span:first-of-type {
                                box-shadow: unset;
                            }
                        `}
                    />
                    {" "}I agree to the {" "}
                    <Button variant="link" size={helperTextFontSize} onClick={onOpenTermsOfService}>
                        Terms of Service
                    </Button>
                    {" "}and{" "}
                    <Button variant="link" size={helperTextFontSize} onClick={onOpenPrivacyPolicy}>
                        Privacy Policy
                    </Button>
                </Text>
            </VStack>
        </VStack>
    )
}