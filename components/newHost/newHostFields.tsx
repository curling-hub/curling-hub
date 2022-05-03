import NextLink from 'next/link'
import StateDropdown from './StateDropdown'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { object, string, boolean } from 'yup';
import { Field, Form, Formik, FieldProps } from 'formik';
import hostSignupSchema from '../host/create/schema';

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
    phoneType: string;
    onPhoneTypeChange: (phoneType: string) => void
    isAgreedPP: boolean;
    onIsAgreedPPChange: () => void;
    onOpenPrivacyPolicy: () => void;
    onOpenTermsOfService: () => void;
}

export default function NewHostFields(props: NewHostFieldsProps) {
    const {
        phoneType,
        onPhoneTypeChange,
        isAgreedPP,
        onIsAgreedPPChange,
        onOpenPrivacyPolicy,
        onOpenTermsOfService
    } = props
    const router = useRouter()

    // TODO: `submit` function should be passed in as props
    // Eventually we will call the auth signup method here
    const submit = async (values: {
            organization: string;
            website: string;
            phone: string;
            phoneType: string;
            address: string;
            address2: string;
            city: string;
            state: string;
            zip: string;
            country: string;
            agreed: boolean;
    }) => {
        console.log(values)
        const urlparams = new URLSearchParams(values as any)
        const res = await fetch('/api/host/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: urlparams.toString(),
        })
        if (res.status !== 200) {
            const { error } = await res.json()
            // TODO: set error message
            console.error(error)
            return
        }
        router.push('/hosts/request')
    }

    const helperTextFontSize = "12";
    return (
        <Formik
            initialValues={{
                organization: '',
                website: '',
                phone: '',
                phoneType: '',
                address: '',
                address2: '',
                city: '',
                state: '',
                zip: '',
                country: '',
                agreed: false
            }}
            validationSchema={hostSignupSchema}
            onSubmit={(values) => submit(values)} // Eventually do auth stuff here
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
                                <Field name="phoneType">
                                    {({field, form}: FieldProps<string>) => (
                                        <FormControl isInvalid={form.errors.phoneType != undefined && form.touched.phoneType != undefined}>
                                            <Select
                                                // width=".5"
                                                {...field}
                                                borderRadius="full"
                                                placeholder='Phone'>
                                                <option>Home</option>
                                                <option>Mobile</option>
                                                <option>Business</option>
                                            </Select>
                                            <FormErrorMessage>{form.errors.phoneType}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

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
                                <Field name="state">
                                    {({field, form}: FieldProps<string>) => (
                                        <FormControl isInvalid={form.errors.state != undefined && form.touched.state != undefined}>
                                            <Select
                                                {...field}
                                                borderRadius="full"
                                                placeholder='State'>
                                                {/* TODO: refactor the state name and code into an array and place it somewhere in lib/ */}
                                                <option value='AL'>Alabama</option>
                                                <option value='AK'>Alaska</option>
                                                <option value='AS'>American Samoa</option>
                                                <option value='AZ'>Arizona</option>
                                                <option value='AR'>Arkansas</option>
                                                <option value='CA'>California</option>
                                                <option value='CO'>Colorado</option>
                                                <option value='CT'>Connecticut</option>
                                                <option value='DE'>Delaware</option>
                                                <option value='DC'>District Of Columbia</option>
                                                <option value='FM'>Federated States Of Micronesia</option>
                                                <option value='FL'>Florida</option>
                                                <option value='GA'>Georgia</option>
                                                <option value='GU'>Guam</option>
                                                <option value='HI'>Hawaii</option>
                                                <option value='ID'>Idaho</option>
                                                <option value='IL'>Illinois</option>
                                                <option value='IN'>Indiana</option>
                                                <option value='IA'>Iowa</option>
                                                <option value='KS'>Kansas</option>
                                                <option value='KY'>Kentucky</option>
                                                <option value='LA'>Louisiana</option>
                                                <option value='ME'>Maine</option>
                                                <option value='MD'>Maryland</option>
                                                <option value='MA'>Massachusetts</option>
                                                <option value='MI'>Michigan</option>
                                                <option value='MN'>Minnesota</option>
                                                <option value='MS'>Mississippi</option>
                                                <option value='MO'>Missouri</option>
                                                <option value='MT'>Montana</option>
                                                <option value='NE'>Nebraska</option>
                                                <option value='NV'>Nevada</option>
                                                <option value='NH'>New Hampshire</option>
                                                <option value='NJ'>New Jersey</option>
                                                <option value='NM'>New Mexico</option>
                                                <option value='NY'>New York</option>
                                                <option value='NC'>North Carolina</option>
                                                <option value='ND'>North Dakota</option>
                                                <option value='MP'>Northern Mariana Islands</option>
                                                <option value='OH'>Ohio</option>
                                                <option value='OK'>Oklahoma</option>
                                                <option value='OR'>Oregon</option>
                                                <option value='PW'>Palau</option>
                                                <option value='PA'>Pennsylvania</option>
                                                <option value='PR'>Puerto Rico</option>
                                                <option value='RI'>Rhode Island</option>
                                                <option value='SC'>South Carolina</option>
                                                <option value='SD'>South Dakota</option>
                                                <option value='TN'>Tennessee</option>
                                                <option value='TX'>Texas</option>
                                                <option value='UT'>Utah</option>
                                                <option value='VT'>Vermont</option>
                                                <option value='VI'>Virgin Islands</option>
                                                <option value='VA'>Virginia</option>
                                                <option value='WA'>Washington</option>
                                                <option value='WV'>West Virginia</option>
                                                <option value='WI'>Wisconsin</option>
                                                <option value='WY'>Wyoming</option>
                                            </Select>
                                            <FormErrorMessage>{form.errors.state}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
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
                                <Field name="country">
                                    {({field, form}: FieldProps<string>) => (
                                        <FormControl isInvalid={form.errors.country != undefined && form.touched.country != undefined}>
                                            <Select
                                                {...field}
                                                borderRadius="full"
                                                placeholder='Country'>
                                                <option value='USA'>USA</option>
                                            </Select>
                                            <FormErrorMessage>{form.errors.country}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
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
                        <VStack w="100%">
                            <Link href="/new-host" passHref>
                                <a>
                                    <Button
                                        type="button"
                                        variant="link"
                                        size="xs"
                                    >
                                        Not a host? Team sign up
                                    </Button>
                                </a>
                            </Link>
                        </VStack>
                        <Divider orientation="horizontal" mt={2} width="100%" />

                        <VStack w="100%" spacing="1">
                            <Text fontSize={helperTextFontSize}>
                                Already have an account?{" "}
                                <NextLink href="/login" passHref>
                                    <ChakraLink>Login</ChakraLink>
                                </NextLink>
                            </Text>
                            <Field name="agreed">
                                {({field, form}: FieldProps<string>) => (
                                    <FormControl isInvalid={form.errors.agreed != undefined && form.touched.agreed != undefined}>
                                        <HStack>
                                            <Checkbox
                                                {...field}
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
                                            <Text fontSize={helperTextFontSize}>
                                            {" "}I agree to the {" "}
                                            <Button variant="link" size={helperTextFontSize} onClick={onOpenTermsOfService}>
                                                Terms of Service
                                            </Button>
                                            {" "}and{" "}
                                            <Button variant="link" size={helperTextFontSize} onClick={onOpenPrivacyPolicy}>
                                                Privacy Policy
                                            </Button>
                                            </Text>
                                        </HStack>
                                        <FormErrorMessage>{form.errors.agreed}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                        </VStack>
                    </VStack>
                </Form>
            )}
        </Formik>
    )
}
