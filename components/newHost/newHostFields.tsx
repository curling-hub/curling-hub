import NextLink from 'next/link'
import StateDropdown from './StateDropdown'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { object, string, boolean } from 'yup';
import { Field, Form, Formik, FieldProps } from 'formik';
import hostSignupSchema from '../host/create/schema';
import {
    Button,
    Checkbox,
    Divider,
    FormControl,
    HStack,
    Link as ChakraLink,
    Input,
    Text,
    Radio,
    RadioGroup,
    Stack,
    VStack,
    Select,
    FormErrorMessage,
    FormLabel,
} from '@chakra-ui/react'
import {
    ActionMeta,
    GroupBase,
    MultiValue,
    OptionBase,
    Select as ChakraReactSelect,
    SingleValue,
} from 'chakra-react-select';


const getFormInitialValues = () => ({
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
    agreed: false,
    iceSheets: [] as string[],
    namingScheme: 'ABC',
})


interface NewHostFieldsProps {
    countryCode: string;
    onCountryCodeChange: (countryCode: string) => void
    isAgreedPP: boolean;
    onIsAgreedPPChange: () => void;
    onOpenPrivacyPolicy: () => void;
    onOpenTermsOfService: () => void;
    onSubmit?: (v: ReturnType<typeof getFormInitialValues>) => Promise<void>;
}

const NewHostFields = (props: NewHostFieldsProps): JSX.Element => {
    const {
        countryCode,
        onCountryCodeChange,
        isAgreedPP,
        onIsAgreedPPChange,
        onOpenPrivacyPolicy,
        onOpenTermsOfService,
        onSubmit = async () => { },
    } = props
    const router = useRouter()

    const helperTextFontSize = "12";
    return (
        <Formik
            initialValues={getFormInitialValues()}
            validationSchema={hostSignupSchema}
            onSubmit={onSubmit} // Eventually do auth stuff here
        >
            {(props) => (
                <Form>
                    <VStack alignItems="start" spacing="4">
                        <Stack>
                            <Field name="organization">
                                {({ field, form }: FieldProps<string>) => (
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
                                {({ field, form }: FieldProps<string>) => (
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
                                    {({ field, form }: FieldProps<string>) => (
                                        <FormControl isInvalid={form.errors.countryCode != undefined && form.touched.countryCode != undefined}>
                                            <FormLabel htmlFor="countryCode" srOnly>Country Code</FormLabel>
                                            <Select
                                                // width=".5"
                                                {...field}
                                                borderRadius="full"
                                                placeholder="Country Code"
                                                id="countryCode"
                                            >
                                                <option value='US'>+1</option>
                                            </Select>
                                            <FormErrorMessage>{form.errors.countryCode}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="phone">
                                    {({ field, form }: FieldProps<string>) => (
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
                                {({ field, form }: FieldProps<string>) => (
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
                                {({ field, form }: FieldProps<string>) => (
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
                                    {({ field, form }: FieldProps<string>) => (
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
                                    {({ field, form }: FieldProps<string>) => (
                                        <FormControl isInvalid={form.errors.state != undefined && form.touched.state != undefined}>
                                            <FormLabel htmlFor="state" srOnly>State</FormLabel>
                                            <Select
                                                {...field}
                                                borderRadius="full"
                                                placeholder='State'
                                                id="state"
                                            >
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
                                    {({ field, form }: FieldProps<string>) => (
                                        <FormControl isInvalid={form.errors.zip != undefined && form.touched.zip != undefined}>
                                            <FormLabel htmlFor="zip" srOnly>Zipcode</FormLabel>
                                            <Input
                                                {...field}
                                                borderRadius="full"
                                                focusBorderColor="green.400"
                                                shadow="sm"
                                                maxLength={5}
                                                //   minLength={5}
                                                placeholder="Zipcode"
                                                onChange={props.handleChange('zip')}
                                                id="zip"
                                            />
                                            <FormErrorMessage>{form.errors.zip}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="country">
                                    {({ field, form }: FieldProps<string>) => (
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
                        <Field name="iceSheetCount">
                            {({ field, form }: FieldProps<string[]>) => (
                                <FormControl>
                                    <ChakraReactSelect<IceSheetSelectOptions, false, GroupBase<IceSheetSelectOptions>>
                                        options={getIceSheetsSelectionOptions()}
                                        placeholder="Number of ice sheets"
                                        focusBorderColor="green.400"
                                        instanceId="iceSheetCount"
                                        id="iceSheetCount"
                                        onFocus={() => { form.setFieldTouched("iceSheetCount", true, true) }}
                                        onChange={
                                            (newValue: SingleValue<IceSheetSelectOptions>, actionMeta: ActionMeta<IceSheetSelectOptions>) => {
                                                const startingChar = form.values.namingScheme === 'ABC' ? 'A' : '1'
                                                const startingCode = startingChar.charCodeAt(0)
                                                form.values.iceSheets = Array(newValue?.value || 0)
                                                    .fill(0)
                                                    .map((_, i) => String.fromCharCode(startingCode + i))
                                                form.validateField("iceSheets");
                                            }
                                        }
                                    />
                                    <FormErrorMessage>{form.errors.iceSheetCount}</FormErrorMessage>

                                </FormControl>
                            )}
                        </Field>
                        <Field name="namingScheme">
                            {({ field, form }: FieldProps<string>) => (
                                <FormControl>
                                    <RadioGroup
                                        {...field}
                                        onChange={() => {
                                            form.values.iceSheets = []
                                        }}
                                    >
                                        <Stack direction="row">
                                            <Text>Naming scheme:</Text>
                                            <Radio {...field} value="ABC">ABC...</Radio>
                                            <Radio {...field} value="123">123...</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
                            )}
                        </Field>
                        <VStack w="100%" spacing={1}>
                            <Field name="agreed">
                                {({ field, form }: FieldProps<string>) => (
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
                        </VStack>
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

                            <Link href="/new-team" passHref>
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
                    </VStack>
                </Form>
            )}
        </Formik>
    )
}

export default NewHostFields



interface IceSheetSelectOptions extends OptionBase {
    label: string
    value: number
}

const getIceSheetsSelectionOptions = (): IceSheetSelectOptions[] => {
    const iceSheetOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    return iceSheetOptions.map((option) => ({ label: `${option}`, value: option }))
}


