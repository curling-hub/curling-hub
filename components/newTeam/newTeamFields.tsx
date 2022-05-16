import { useState } from 'react'
import Link from 'next/link'
import {
    Link as ChakraLink,
    Input,
    Stack,
    VStack,
    HStack,
    Button,
    Radio,
    RadioGroup,
    Text,
    Checkbox,
    FormControl,
    FormErrorMessage
} from '@chakra-ui/react'
import {
    Select,
    OptionBase,
    GroupBase,
    ActionMeta,
    MultiValue
} from "chakra-react-select"
import { object, string, boolean, number, array } from 'yup';
import { Field, Form, Formik, FieldProps, FieldArray, FieldArrayRenderProps } from 'formik';
import type { Category } from '../../lib/models';
import { useRouter } from 'next/router';



const getInitialValues = (otherFields?: any) => ({
    team: '',
    gameMode: 'open',
    curler1: '',
    curler2: '',
    curler3: '',
    curler4: '',
    showAlternate: false,
    alternate: '',
    categories: [],
    agreed: false,
    ...otherFields,
})


interface CategorySelectOptions extends OptionBase {
    label: string
    value: number
}


interface NewTeamFieldsProps {
    onOpenPrivacyPolicy: () => void;
    onOpenTermsOfService: () => void;
    categories: Category[];
    onSubmit?: (values: ReturnType<typeof getInitialValues>) => Promise<void>
}

export default function NewTeamFields(props: NewTeamFieldsProps) {
    const {
        onOpenPrivacyPolicy,
        onOpenTermsOfService,
        categories,
        onSubmit = async () => { },
    } = props

    const [mode, setMode] = useState(true)
    const [alternate, setAlternate] = useState(false)

    const modeMap = new Map<boolean, string>([
        [true, "open"],
        [false, "doubles"]
    ])

    let newTeamSchema = object({
        team: string().required("Enter the team name").max(255),
        curler1: string().required("Curler one is required").max(255),
        curler2: string().required("Curler two is required").max(255),
        gameMode: string().required(),
        curler3: string().when("gameMode", {
            is: 'open',
            then: string().required("Curler three is required").max(255)
        }),
        curler4: string().when("gameMode", {
            is: 'open',
            then: string().required("Curler four is required").max(255)
        }),
        showAlternate: boolean().required(),
        alternate: string().when("showAlternate", {
            is: true,
            then: string().required("Alternate is required")
        }),
        categories: array()
            .of(object({
                value: number(),
                label: string().required()
            })).min(1, "Please select at least one category"),
        agreed: boolean().required().isTrue("Please agree to the terms of service and privacy policy")
    });

    const groupedOptions = categories
        .filter((category: Category) => category.name !== 'Open' && category.name !== 'Doubles')
        .map((category: Category) => ({ value: category.categoryId, label: category.name }))
    const openCategory = (() => {
        const matchings = categories.filter((category: Category) => category.name === 'Open')
        if (matchings.length > 0) {
            return { label: matchings[0].name, value: matchings[0].categoryId, isFixed: true }
        }
    })()
    const doublesCategory = (() => {
        const matchings = categories.filter((category: Category) => category.name === 'Doubles')
        if (matchings.length > 0) {
            return { label: matchings[0].name, value: matchings[0].categoryId, isFixed: true }
        }
    })()

    return (
        <Formik
            initialValues={getInitialValues(openCategory ? { categories: [openCategory] } : {})}
            validationSchema={newTeamSchema}
            onSubmit={onSubmit}
        >
            {(props) => (
                <Form>
                    <VStack alignItems="center" spacing="4">
                        <Field name="team">
                            {({ field, form }: FieldProps<string>) => (
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
                            {({ field, form }: FieldProps<string>) => (
                                <RadioGroup
                                    {...field}
                                    onChange={() => {
                                        const isDoubleMode = !mode;
                                        setMode(isDoubleMode);
                                        if (!isDoubleMode) {
                                            form.values.categories = form.values.categories
                                                .filter((c: CategorySelectOptions) => (c.label !== 'Open'))
                                            doublesCategory && form.values.categories.unshift(doublesCategory)
                                        } else {
                                            form.values.categories = form.values.categories
                                                .filter((c: CategorySelectOptions) => (c.label !== 'Doubles'))
                                            openCategory && form.values.categories.unshift(openCategory)
                                        }
                                    }}
                                    value={modeMap.get(mode)}
                                >
                                    <Stack {...field} direction="row" alignItems="right">
                                        <Radio {...field} colorScheme="green" value="open">Open</Radio>
                                        <Radio {...field} colorScheme="green" value="doubles">Doubles</Radio>
                                    </Stack>
                                </RadioGroup>
                            )}
                        </Field>
                        <Field name="curler1">
                            {({ field, form }: FieldProps<string>) => (
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
                        <Field name="curler2">
                            {({ field, form }: FieldProps<string>) => (
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
                        {mode &&
                            <>
                                <Field name="curler3">
                                    {({ field, form }: FieldProps<string>) => (
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

                                <Field name="curler4">
                                    {({ field, form }: FieldProps<string>) => (
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
                                            {({ field, form }: FieldProps<string>) => (
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
                                            {({ field, form }: FieldProps<string>) => (
                                                <Button
                                                    {...field}
                                                    onClick={() => { setAlternate(!alternate), form.values.showAlternate = false }}
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
                                        {({ field, form }: FieldProps<string>) => (
                                            <Button
                                                {...field}
                                                onClick={() => { setAlternate(!alternate), form.values.showAlternate = true }}
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
                        {mode && (
                            <FieldArray name="categories">
                                {({ form, remove }: FieldArrayRenderProps) => (
                                    <FormControl isInvalid={form.errors.categories != undefined && form.touched.categories != undefined}>
                                        <Select<CategorySelectOptions, true, GroupBase<CategorySelectOptions>>
                                            isMulti
                                            options={groupedOptions}
                                            placeholder="Select Categories..."
                                            closeMenuOnSelect={false}
                                            focusBorderColor="green.400"
                                            id="categories"
                                            instanceId="categories"
                                            value={form.values.categories}
                                            onFocus={() => { form.setFieldTouched("categories", true, true) }}
                                            onChange={
                                                ((newValue: MultiValue<OptionBase>, actionMeta: ActionMeta<OptionBase>) => {
                                                    form.values.categories = newValue;
                                                    if (form.values.categories.length === 0) {
                                                        form.values.categories = form.values.categories
                                                            .filter((c: CategorySelectOptions) => (c.label !== 'Doubles'))
                                                        openCategory && form.values.categories.unshift(openCategory)
                                                    }
                                                    form.validateField("categories");
                                                })
                                            }
                                        />

                                        <FormErrorMessage>{form.errors.categories}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </FieldArray>
                        )}
                        <HStack>
                            <Field name="agreed">
                                {({ field, form }: FieldProps<string>) => (
                                    <FormControl isInvalid={form.errors.agreed != undefined && form.touched.agreed != undefined}>
                                        <HStack>
                                            <Checkbox
                                                {...field}
                                                name="agree-box"
                                                aria-label=""
                                                checked={form.values.agree}
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
                        <Link href="/new-host" passHref>
                            <a>
                                <Button
                                    type="button"
                                    variant="link"
                                    size="xs"
                                >
                                    Not a team? Host sign up
                                </Button>
                            </a>
                        </Link>
                    </VStack>
                </Form>
            )}
        </Formik>
    )
}
