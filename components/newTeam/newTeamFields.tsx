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
import { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/router';

interface NewTeamFieldsProps {
    onOpenPrivacyPolicy: () => void;
    onOpenTermsOfService: () => void;
    categories: RowDataPacket
}

export default function NewTeamFields(props: NewTeamFieldsProps) {
    const router = useRouter()

    const submit = async (values: {
        team: string,
        gameMode: string,
        curler1: string,
        curler2: string,
        curler3: string,
        curler4: string,
        showAlternate: boolean,
        alternate: string,
        categories: string,
        agreed: boolean
    }) => {

        var req = {}

        if (values.gameMode == 'doubles') {
            req = {
                team: values.team,
                curler1: values.curler1,
                curler2: values.curler2,
                categories: [values.categories]
            }
        } else if (values.showAlternate) {
            req = {
                team: values.team,
                curler1: values.curler1,
                curler2: values.curler2,
                curler3: values.curler3,
                curler4: values.curler4,
                alternate: values.alternate,
                categories: [values.categories]
            }
        } else {
            req = {
                team: values.team,
                curler1: values.curler1,
                curler2: values.curler2,
                curler3: values.curler3,
                curler4: values.curler4,
                categories: [values.categories]
            }
        }

        const res = await fetch('/api/team/create', {
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        
        if (res.status == 200) {
            router.push('/team-profile')
        } else {
            alert("error: "+res.statusText)
        }
    }

    const {
        onOpenPrivacyPolicy,
        onOpenTermsOfService,
        categories
    } = props
    
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
        gameMode: string().required(),
        curler3: string().when("gameMode", {
            is: 'classic',
            then: string().required("Curler Three is required").max(255)
        }),
        curler4: string().when("gameMode", {
            is: 'classic',
            then: string().required("Curler Four is required").max(255)
        }),
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
                gameMode: 'classic',
                curler1: '',
                curler2: '',
                curler3: '',
                curler4: '',
                showAlternate: false,
                alternate: '',
                categories: '',
                agreed: false
            }}
            validationSchema={newTeamSchema}
            onSubmit={async (values) => await submit(values)} // Eventually do auth stuff here
        >
            {( props ) => (
                <Form>
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
                                    onChange={props.handleChange('team')}
                                />
                                <FormErrorMessage>{form.errors.team}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="gameMode">
                            {({field, form}: FieldProps<string>) => (
                                <RadioGroup 
                                    {...field}
                                    onChange={() => setMode(!mode)} 
                                    value={modeMap.get(mode)}
                                >
                                    <Stack {...field} direction="row" alignItems="right">
                                        <Radio {...field} colorScheme="green" value="classic">Classic</Radio>
                                        <Radio {...field} colorScheme="green" value="doubles">Doubles</Radio> 
                                    </Stack>
                                </RadioGroup>
                            )}
                        </Field>
                        <Field name = "curler1">
                            {({field, form}: FieldProps<string>) => (
                                <FormControl isInvalid={form.errors.curler1 != undefined && form.touched.curler1 != undefined}>
                                    <Input
                                        {...field}
                                        borderRadius="full"
                                        focusBorderColor="green.400"
                                        shadow="sm"
                                        placeholder="Curler One"
                                        onChange={props.handleChange('curler1')}
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
                                        onChange={props.handleChange('curler2')}
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
                                        onChange={props.handleChange('curler3')}
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
                                        onChange={props.handleChange('curler4')}
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
                                                    onChange={props.handleChange('alternate')}
                                                />
                                                <FormErrorMessage>{form.errors.alternate}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="showAlternate">
                                            {({field, form}: FieldProps<string>) => (
                                                <Button 
                                                    {...field}
                                                    onClick={() => {setAlternate(!alternate), form.values.showAlternate = false}}
                                                    onChange={props.handleChange('showAlternate')} 
                                                    variant="link" 
                                                    color="black" 
                                                    size="xs"
                                                >
                                                    Remove Alternate
                                                </Button>
                                            )}
                                        </Field>
                                    </>
                                : 
                                    <Field name="showAlternate">
                                        {({field, form}: FieldProps<string>) => (
                                            <Button 
                                                {...field}
                                                onClick={() => {setAlternate(!alternate), form.values.showAlternate = true}} 
                                                onChange={props.handleChange('showAlternate')} 
                                                variant="link" 
                                                color="black" 
                                                size="xs"
                                            >
                                                Add Alternate
                                            </Button>
                                        )}
                                    </Field>
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
                                        onChange={props.handleChange('categories')}
                                    >
                                        {categories.map((category: RowDataPacket) => {
                                            return (
                                                <option key={category.name} value={category.name}>{category.name}</option>
                                            )
                                        })}
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
                                            onChange={props.handleChange('agreed')}
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
                </Form>
            )}
        </Formik>
    )
}