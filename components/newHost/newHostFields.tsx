import NextLink from 'next/link'
import StateDropdown from './StateDropdown'
import { object, string, boolean } from 'yup';
import { Field, Form, Formik, FieldProps } from 'formik';
import {useState} from 'react'
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

    Radio,
    RadioGroup,

} from '@chakra-ui/react'

interface NewHostFieldsProps {
    countryCode: string;
    onCountryCodeChange: (countryCode: string) => void
    isAgreedPP: boolean;
    onIsAgreedPPChange: () => void;
    onOpenPrivacyPolicy: () => void;
    onOpenTermsOfService: () => void;
}

export default function NewHostFields(props: NewHostFieldsProps) {
    const {
        countryCode,
        onCountryCodeChange,
        isAgreedPP,
        onIsAgreedPPChange,
        onOpenPrivacyPolicy,
        onOpenTermsOfService
    } = props

    // REs used to identify valid phone number and zip code. pulled randomly from internet.
    const phoneRE = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/g;
    const zipRE = /^\d{5}(?:[- ]?\d{4})?$/

    // Defines a valid form state
    let hostSignupSchema = object({
        organization: string().required(), 
        website: string().required().url().nullable(),
        phone: string().matches(phoneRE, 'invalid phone number').required(),
        phoneType: string().required("phone type is a required field"),
        address: string().required(), 
        address2: string().optional(), 
        city: string().required(), 
        state: string().required(),
        zip: string().matches(zipRE, 'invalid zip code').required(), 
        country: string().required(), 
        sheetofice: string().required('Sheet(s) of Ice is required'),
        namingschema: string().required('Naming Schema must be declared'),
        agreed: boolean().required().isTrue("Please agree to the terms of service and privacy policy")
    });

    // Eventually we will call the auth signup method here
    const submit = (values: {
            organization: string;
            website: string;
            phone: string;
            countryCode: string;
            address: string;
            address2: string;
            city: string;
            state: string;
            zip: string;
            country: string;
            sheetofice: string;
            namingschema: string;
            agreed: boolean;
        }) => {
            alert(JSON.stringify(values))
    }

    const [schema,setSchema] = useState(true)
    const schemaMap = new Map<boolean,string>([
        [true, "ABC"],
        [false, "123"]
    ])


    const helperTextFontSize = "12";
    return (
        <Formik
            initialValues={{
                organization: '',
                website: '',
                phone: '',
                countryCode: '',
                address: '',
                address2: '',
                city: '',
                state: '',
                zip: '',
                country: '',
                sheetofice:'',
                namingschema: 'ABC', 
                agreed: false,
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
                                        <FormLabel htmlFor="organization" srOnly>Organization</FormLabel>
                                        <Input
                                            {...field}
                                            borderRadius="full"
                                            focusBorderColor="green.400"
                                            shadow="sm"
                                            placeholder="Organization"
                                            onChange={props.handleChange('organization')}
                                            id="organization"
                                        />
                                        <FormErrorMessage>{form.errors.organization}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="website">
                                {({field, form}: FieldProps<string>) => (
                                    <FormControl isInvalid={form.errors.website != undefined && form.touched.website != undefined}>
                                        <FormLabel htmlFor="website" srOnly>Website</FormLabel>
                                        <Input
                                            {...field}
                                            borderRadius="full"
                                            focusBorderColor="green.400"
                                            shadow="sm"
                                            placeholder="Website"
                                            onChange={props.handleChange('website')}
                                            id="website"
                                        />
                                    <FormErrorMessage>{form.errors.website}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <HStack>
                                <Field name="countryCode">
                                    {({field, form}: FieldProps<string>) => (
                                        <FormControl isInvalid={form.errors.countryCode != undefined && form.touched.countryCode != undefined}>
                                            <FormLabel htmlFor="countryCode" srOnly>Country Code</FormLabel>
                                            <Select
                                                // width=".5"
                                                {...field}
                                                borderRadius="full"
                                                placeholder="Country Code"
                                                id="countryCode"
                                            >
                                                <option>+1</option>
                                            </Select>
                                            <FormErrorMessage>{form.errors.countryCode}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="phone">
                                    {({field, form}: FieldProps<string>) => (
                                        <FormControl isInvalid={form.errors.phone != undefined && form.touched.phone != undefined}>
                                            <FormLabel htmlFor="phone" srOnly>Phone</FormLabel>
                                            <Input
                                                // width=".75"
                                                {...field}
                                                type="phone"
                                                borderRadius="full"
                                                focusBorderColor="green.400"
                                                shadow="sm"
                                                placeholder="Phone"
                                                onChange={props.handleChange('phone')}
                                                id="phone"
                                            />
                                        <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>    
                            </HStack>
                            <Field name="address">
                                {({field, form}: FieldProps<string>) => (
                                    <FormControl isInvalid={form.errors.address != undefined && form.touched.address != undefined}>
                                        <FormLabel htmlFor="address" srOnly>Street Address</FormLabel>
                                        <Input
                                            {...field}
                                            borderRadius="full"
                                            focusBorderColor="green.400"
                                            shadow="sm"
                                            placeholder="Street Address"
                                            onChange={props.handleChange('address')}
                                            id="address"
                                        />
                                    <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>        
                            <Field name="address2">
                                {({field, form}: FieldProps<string>) => (
                                    <FormControl isInvalid={form.errors.address2 != undefined && form.touched.address2 != undefined}>
                                        <FormLabel htmlFor="address2" srOnly>Apt., Suite, Unit, etc.</FormLabel>
                                        <Input
                                            {...field}
                                            borderRadius="full"
                                            focusBorderColor="green.400"
                                            shadow="sm"
                                            placeholder="Apt., Suite, Unit, etc."
                                            onChange={props.handleChange('address2')}
                                            id="address2"
                                        />
                                    <FormErrorMessage>{form.errors.address2}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>   
                            <HStack>
                                <Field name="city">
                                    {({field, form}: FieldProps<string>) => (
                                        <FormControl isInvalid={form.errors.city != undefined && form.touched.city != undefined}>
                                            <FormLabel htmlFor="city" srOnly>City</FormLabel>
                                            <Input
                                                {...field}
                                                borderRadius="full"
                                                focusBorderColor="green.400"
                                                shadow="sm"
                                                placeholder="City"
                                                onChange={props.handleChange('city')}
                                                id="city"
                                            />
                                        <FormErrorMessage>{form.errors.city}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="state">
                                    {({field, form}: FieldProps<string>) => (
                                        <FormControl isInvalid={form.errors.state != undefined && form.touched.state != undefined}>
                                            <FormLabel htmlFor="state" srOnly>State</FormLabel>
                                            <Select
                                                {...field}
                                                borderRadius="full"

                                                placeholder='State'>

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
                                            <FormLabel htmlFor="zip" srOnly>Zipcode</FormLabel>
                                            <Input
                                                {...field}
                                                borderRadius="full"
                                                focusBorderColor="green.400"
                                                shadow="sm"
                                                placeholder="Zipcode"
                                                onChange={props.handleChange('zip')}
                                                id="zip"
                                            />
                                        <FormErrorMessage>{form.errors.zip}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>        
                                <Field name="country">
                                    {({field, form}: FieldProps<string>) => (
                                        <FormControl isInvalid={form.errors.country != undefined && form.touched.country != undefined}>
                                            <FormLabel htmlFor="country" srOnly>Country</FormLabel>
                                            <Select
                                                {...field}
                                                borderRadius="full"
                                                placeholder='Country'
                                                id="country"
                                            >
                                                <option value='USA'>USA</option>
                                            </Select>
                                            <FormErrorMessage>{form.errors.country}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </HStack>

                        </Stack>
                        <Field name='sheetofice'>
                          {({field, form}: FieldProps<string>) => (
                            <FormControl isInvalid={form.errors.sheetofice != undefined && form.touched.sheetofice != true}>
                            {!schema && (
                            <Select placeholder = 'Sheets of Ice'
                                borderRadius="full">
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                    <option value='6'>6</option>
                                    <option value='7'>7</option>
                                    <option value='8'>8</option>
                                    <option value='9'>9</option>
                                    <option value='10'>10</option>
                                    <option value='11'>11</option>
                                    <option value='12'>12</option>         
                            </Select>
                            )}
                            {schema && (
                            <Select placeholder = 'Sheets of Ice'
                                borderRadius="full">
                                    <option value='A'>A</option>
                                    <option value='B'>B</option>
                                    <option value='C'>C</option>
                                    <option value='D'>D</option>
                                    <option value='E'>E</option>
                                    <option value='F'>F</option>
                                    <option value='G'>G</option>
                                    <option value='H'>H</option>
                                    <option value='I'>I</option>
                                    <option value='J'>J</option>      
                                    <option value='K'>K</option>    
                                    <option value='L'>L</option>       
                            </Select>
                            )}

                            <FormErrorMessage>{form.errors.sheetofice}</FormErrorMessage>
                         </FormControl>
                          )}
                        </Field>
                        <Field name="namingschema">
                            {({field, form}: FieldProps<string>) => (
                                <FormControl isInvalid={form.errors.namingschema != undefined && form.touched.namingschema != undefined}>
                                <RadioGroup
                                    {...field}
                                    onChange={
                                        () => setSchema(!schema)
                                    }
                                    value={schemaMap.get(schema)}>
                                    <Stack {...field} direction="row" alignItems="right">
                                        <Text>Naming Schema: </Text>
                                        <Radio {...field} colorScheme="blue" value="ABC">ABC...</Radio>
                                        <Radio {...field} colorScheme="blue" value="123">123...</Radio> 
                                    </Stack>
                                </RadioGroup>
                                <FormErrorMessage>{form.errors.namingschema}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>          
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

                            <Field name="agreed">
                                {({field, form}: FieldProps<string>) => (
                                    <FormControl isInvalid={form.errors.agreed != undefined && form.touched.agreed != undefined}>
                                        <HStack>
                                            <Checkbox
                                                {...field}
                                                id="agreed"
                                                size="sm"
                                                borderRadius="50%"
                                                colorScheme="teal"
                                                css={`
                                                    > span:first-of-type {
                                                        box-shadow: unset;
                                                    }
                                                `}
                                            />
                                            <FormLabel htmlFor="agreed">
                                                <Text fontSize={helperTextFontSize}>
                                                    I agree to the{" "}
                                                    <Button textColor="primary.black" variant="link" size={helperTextFontSize} onClick={onOpenTermsOfService}>
                                                        <b>Terms of Service</b>
                                                    </Button>
                                                    {" "}and{" "}
                                                    <Button textColor="primary.black" variant="link" size={helperTextFontSize} onClick={onOpenPrivacyPolicy}>
                                                        <b>Privacy Policy</b>
                                                    </Button>
                                                </Text>
                                            </FormLabel>
                                        </HStack>
                                        <FormErrorMessage>{form.errors.agreed}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                        </Stack>
                        <Button
                            type='submit'
                            isFullWidth
                            bg="primary.green"
                            borderRadius="full"
                            boxShadow="md"
                            _hover={{ bg: "green.400" }}
                            _active={{ bg: "green.600" }}
                            _focus={{ boxShadow: "dark-lg" }}
                        >
                            Request Account
                        </Button>
                        <VStack w="100%">
                            <Text fontSize={helperTextFontSize}>
                                Not a host?{" "}
                                <NextLink href="/new-host" passHref>
                                    <ChakraLink><b>Team Sign Up</b></ChakraLink>
                                </NextLink>
                            </Text>
                        </VStack>
                    </VStack>
                </Form>
            )}
        </Formik>
    )
}