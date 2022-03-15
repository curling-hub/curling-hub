import NextLink from 'next/link'
import StateDropdown from './StateDropdown'
import { object, string, number, date, InferType } from 'yup';
import { Field, Form, Formik, FieldProps } from 'formik';

const MyInput = ({ ...props }) => {

    return <input {...props} />;
 
};

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
    FormErrorMessage,
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
        onOpenTermsOfService
    } = props

    const phoneRE = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/g;
    let hostSignupSchema = object({
        organization: string().required(), // TODO: ??
        website: string().required().url().nullable(),
        phone: string().matches(phoneRE, 'invalid phone number').required(),
        address: string().required(), // TODO: ??
        address2: string().required(), // TODO: ??
        city: string().required(), // TODO: ??
        state: string().required(), 
        zip: string().required(), // TODO: ??
        country: string().required() 
    });
    const helperTextFontSize = "12";
    return (
        <Formik
            initialValues={{
                organization: '',
                website: '',
                phone: '',
                address: '',
                address2: '',
                city: '',
                state: '',
                zip: '',
                country: ''
            }}
            validationSchema={hostSignupSchema}
            onSubmit={values => {console.log('hello')}}
        >
            {( props ) => (
                <Form>
                    <VStack alignItems="start" spacing="4">
                        <Stack>
                            <Field name="organization">
                                {({field, form}: FieldProps<string>) => (
                                    <FormControl isInvalid={form.errors.organization != undefined && form.touched.organization != undefined}>
                                        <Input
                                            {...field}
                                            borderRadius="full"
                                            focusBorderColor="green.400"
                                            shadow="sm"
                                            placeholder="Organization"
                                            onChange={props.handleChange('organization')}
                                        />
                                        <FormErrorMessage>{form.errors.organization}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="website">
                                {({field, form}: FieldProps<string>) => (
                                    <FormControl isInvalid={form.errors.website != undefined && form.touched.website != undefined}>
                                        <Input
                                            {...field}
                                            borderRadius="full"
                                            focusBorderColor="green.400"
                                            shadow="sm"
                                            placeholder="Website"
                                            onChange={props.handleChange('website')}
                                        />
                                    <FormErrorMessage>{form.errors.website}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <HStack>
                                <Field name="phone">
                                    {({field, form}: FieldProps<string>) => (
                                        <FormControl isInvalid={form.errors.phone != undefined && form.touched.phone != undefined}>
                                            <Input
                                                // width=".75"
                                                {...field}
                                                type="phone"
                                                borderRadius="full"
                                                focusBorderColor="green.400"
                                                shadow="sm"
                                                placeholder="Phone"
                                                onChange={props.handleChange('phone')}
                                            />
                                        <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>    
                                <Select
                                    // width=".5"
                                    borderRadius="full"
                                    placeholder='Phone'>
                                    <option value={phoneType}>Home</option>
                                    <option value={phoneType}>Mobile</option>
                                    <option value={phoneType}>Business</option>
                                </Select>
                            </HStack>
                            <Field name="address">
                                {({field, form}: FieldProps<string>) => (
                                    <FormControl isInvalid={form.errors.address != undefined && form.touched.address != undefined}>
                                        <Input
                                            {...field}
                                            borderRadius="full"
                                            focusBorderColor="green.400"
                                            shadow="sm"
                                            placeholder="Street Address"
                                            onChange={props.handleChange('address')}
                                        />
                                    <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>        
                            <Field name="address2">
                                {({field, form}: FieldProps<string>) => (
                                    <FormControl isInvalid={form.errors.address2 != undefined && form.touched.address2 != undefined}>
                                        <Input
                                            {...field}
                                            borderRadius="full"
                                            focusBorderColor="green.400"
                                            shadow="sm"
                                            placeholder="Apt., Suite, Unit, etc."
                                            onChange={props.handleChange('address2')}
                                        />
                                    <FormErrorMessage>{form.errors.address2}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>   
                            <HStack>
                                <Field name="city">
                                    {({field, form}: FieldProps<string>) => (
                                        <FormControl isInvalid={form.errors.city != undefined && form.touched.city != undefined}>
                                            <Input
                                                {...field}
                                                borderRadius="full"
                                                focusBorderColor="green.400"
                                                shadow="sm"
                                                placeholder="City"
                                                onChange={props.handleChange('city')}
                                            />
                                        <FormErrorMessage>{form.errors.city}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <StateDropdown />
                            </HStack>
                            <HStack>
                                <Field name="zip">
                                    {({field, form}: FieldProps<string>) => (
                                        <FormControl isInvalid={form.errors.zip != undefined && form.touched.zip != undefined}>
                                            <Input
                                                {...field}
                                                borderRadius="full"
                                                focusBorderColor="green.400"
                                                shadow="sm"
                                                placeholder="Zipcode"
                                                onChange={props.handleChange('zip')}
                                            />
                                        <FormErrorMessage>{form.errors.zip}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>        
                                <Select
                                    borderRadius="full"
                                    placeholder='Country'>
                                    <option value='USA'>USA</option>
                                </Select>
                            </HStack>
                        </Stack>
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
                </Form>
            )}
        </Formik>
    )
}