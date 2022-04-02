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
    Checkbox,
    FormControl,
    FormErrorMessage
} from '@chakra-ui/react'
import { object, string, boolean } from 'yup';
import { Field, Form, Formik, FieldProps } from 'formik';
import { RowDataPacket } from 'mysql2';

interface NewTeamFieldsProps {
    onOpenPrivacyPolicy: () => void;
    onOpenTermsOfService: () => void;
    categories: RowDataPacket
}

export default function NewTeamFields(props: NewTeamFieldsProps) {
    const {
        onOpenPrivacyPolicy,
        onOpenTermsOfService,
        categories
    } = props
    console.log(categories)
    const [mode, setMode] = useState(true)
    const [alternate, setAlternate] = useState(false)
    const modeMap = new Map<boolean, string>([
        [true, "classic"],
        [false, "doubles"]
    ])

    let newTeamSchema = object({
        team: string().required("Team Name is required").max(255),
        curler1: string().required("Curler One is required").max(255),
        curler2: string().required("Curler Two is required").max(255),
        curler3: string().required("Curler Three is required").max(255),
        curler4: string().required("Curler Four is required").max(255),
        showAlternate: boolean().required(),
        alternate: string().when("showAlternate", {
            is: true,
            then: string().required("Alternate is required")
        }),
        categories: string().required("Must pick at least one category"),
        agreed: boolean().required().isTrue("Please agree to the terms of service and privacy policy")
    });
    
    return (
        <Formik
            initialValues={{
                team: '',
                curler1: '',
                curler2: '',
                curler3: '',
                curler4: '',
                curler5: '',
                showAlternate: mode,
                alternate: '',
                categories: '',
                agreed:false
            }}
            validationSchema={newTeamSchema}
            onSubmit={() => {}} // Eventually do auth stuff here
        >
            {( props ) => (
                <VStack alignItems="center" spacing="4">
                    <Field name="team">
                        {({field, form}: FieldProps<string>) => (
                            <FormControl isInvalid={form.errors.team != undefined && form.touched.team != undefined}>
                            <Input
                                {...field}
                                borderRadius="full"
                                focusBorderColor="green.400"
                                shadow="sm"
                                placeholder="Team Name"
                            />
                            <FormErrorMessage>{form.errors.team}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <RadioGroup onChange={() => setMode(!mode)} value={modeMap.get(mode)}>
                        <Stack direction="row" alignItems="right">
                            <Radio colorScheme="green" value="classic">Classic</Radio>
                            <Radio colorScheme="green" value="doubles">Doubles</Radio>
                        </Stack>
                    </RadioGroup>
                    <Field name = "curler1">
                        {({field, form}: FieldProps<string>) => (
                             <FormControl isInvalid={form.errors.curler1 != undefined && form.touched.curler1 != undefined}>
                                <Input
                                    {...field}
                                    borderRadius="full"
                                    focusBorderColor="green.400"
                                    shadow="sm"
                                    placeholder="Curler One"
                                />
                                <FormErrorMessage>{form.errors.curler1}</FormErrorMessage>
                                </FormControl>
                        )}
                    </Field>
                    <Field name = "curler2">
                        {({field, form}: FieldProps<string>) => (
                                <FormControl isInvalid={form.errors.curler2 != undefined && form.touched.curler2 != undefined}>
                                <Input
                                    {...field}
                                    borderRadius="full"
                                    focusBorderColor="green.400"
                                    shadow="sm"
                                    placeholder="Curler Two"
                                    />
                                <FormErrorMessage>{form.errors.curler2}</FormErrorMessage>
                                </FormControl> 
                            )}
                    </Field>
                    { mode && 
                        <>
                        
                        <Field name = "curler3">
                            {({field, form}: FieldProps<string>) => (
                                 <FormControl isInvalid={form.errors.curler3 != undefined && form.touched.curler3 != undefined}>
                                <Input
                                    {...field}
                                    borderRadius="full"
                                    focusBorderColor="green.400"
                                    shadow="sm"
                                    placeholder="Curler Three"
                                />
                                <FormErrorMessage>{form.errors.curler3}</FormErrorMessage>    
                                </FormControl>
                            )}
                        </Field>

                        <Field name = "curler4">
                            {({field, form}: FieldProps<string>) => (
                                <FormControl isInvalid={form.errors.curler4 != undefined && form.touched.curler4 != undefined}>
                                <Input
                                    {...field}
                                    borderRadius="full"
                                    focusBorderColor="green.400"
                                    shadow="sm"
                                    placeholder="Curler Four"
                                />
                                 <FormErrorMessage>{form.errors.curler4}</FormErrorMessage>    
                                </FormControl>      
                            )}
                        </Field>
                        

                            {alternate ? 
                                <>
                                    <Field name="alternate">
                                        {({field, form}: FieldProps<string>) => (
                                            <FormControl isInvalid={form.errors.alternate != undefined && form.touched.alternate != undefined}>
                                            <Input
                                                {...field}
                                                borderRadius="full"
                                                focusBorderColor="green.400"
                                                shadow="sm"
                                                placeholder="Alternate"
                                            />
                                            <FormErrorMessage>{form.errors.alternate}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
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
                    <Field name="categories">
                        {({field, form}: FieldProps<string>) => (
                            <FormControl isInvalid={form.errors.categories != undefined && form.touched.categories != undefined}>
                                <Select
                                // TODO: POPULATE CATEGORIES VIA SERVER SIDE RENDER. SEE JIRA BOARD FOR DETAILS.
                                {...field}
                                borderRadius="full"
                                placeholder="Select Categories..."
                                >
                                </Select>
                            <FormErrorMessage>{form.errors.categories}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <HStack>
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
                                <FormErrorMessage>{form.errors.agreed}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
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
            )}
        </Formik>
    )
}