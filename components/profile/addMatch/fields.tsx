import * as yup from 'yup'
import {
    ErrorMessage,
    Field,
    FieldProps,
    Form,
    Formik,
} from 'formik'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Grid,
    HStack,
    Input,
    Select,
    Stack,
    Spacer,
    Textarea,
    VStack,
    useRadioGroup,
} from '@chakra-ui/react'

import schema from './schema'
import ResultRadio from './resultRadio'


const getLocations = () => ([
    'Other',
])

const getInitialValues = () => ({
    matchResult: 'Win',
    date: '',
    opponent: '',
    category: '',
    location: '',
    sheetOfIce: '',
    comments: '',
})


const Fields = (): JSX.Element => {
    const resultOptions = [ 'Win', 'Loss', 'Tie' ]

    return (
        <Formik
            initialValues={getInitialValues()}
            validationSchema={schema}
            onSubmit={(values) => { console.log(values) }}
        >
            {(props) => (
                <Form>
                    <VStack spacing={4}>
                        <Grid
                            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                            rowGap={4}
                            columnGap={12}
                            w="100%"
                        >
                            <Box w="100%">
                                <Field name="matchResult">
                                    {({field, form}: FieldProps<string>) => {
                                        const { getRootProps, getRadioProps } = useRadioGroup({
                                            name: field.name,
                                            value: field.value,
                                        })

                                        const group = getRootProps()

                                        return (
                                            <FormControl>
                                                <Flex justifyContent="space-between" {...group}>
                                                    {resultOptions.map((value) => (
                                                        <ResultRadio
                                                            key={value}
                                                            {...getRadioProps({ value })}
                                                            onChange={field.onChange}
                                                        >
                                                            {value}
                                                        </ResultRadio>
                                                    ))}
                                                </Flex>
                                            </FormControl>
                                        )
                                    }}
                                </Field>
                            </Box>
                            <Box w="100%">
                                <Field name="date">
                                    {({field, form}: FieldProps) => (
                                        <FormControl>
                                            <Input
                                                type="date"
                                                w="100%"
                                                borderRadius="full"
                                                {...field}
                                            />
                                        </FormControl>
                                    )}
                                </Field>
                                <Box textColor="red.500" px={2}>
                                    <ErrorMessage name="date" />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid
                            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                            rowGap={4}
                            columnGap={12}
                            w="100%"
                        >
                            <Box w="100%">
                                <Field name="opponent">
                                    {({field, form}: FieldProps) => (
                                        <FormControl>
                                            <Select
                                                borderRadius="full"
                                                placeholder="Opponent"
                                                {...field}
                                            >
                                                <option value="other">Other</option>
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                                <Box textColor="red.500" px={2}>
                                    <ErrorMessage name="opponent" />
                                </Box>
                            </Box>
                            <Box w="100%">
                                <Field name="category">
                                    {({field, form}: FieldProps) => (
                                        <FormControl>
                                            <Select
                                                borderRadius="full"
                                                placeholder="Category"
                                                {...field}
                                            >
                                                <option value="other">Other</option>
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                                <Box textColor="red.500" px={2}>
                                    <ErrorMessage name="category" />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid
                            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                            rowGap={4}
                            columnGap={12}
                            w="100%"
                        >
                            <Box w="100%">
                                <Field name="location">
                                    {({field, form}: FieldProps) => (
                                        <FormControl>
                                            <Select
                                                borderRadius="full"
                                                placeholder="Location"
                                                {...field}
                                            >
                                                <option value="other">Other</option>
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                                <Box textColor="red.500" px={2}>
                                    <ErrorMessage name="location" />
                                </Box>
                            </Box>
                            <Box w="100%">
                                <Field name="sheetOfIce">
                                    {({field, form}: FieldProps) => (
                                        <FormControl>
                                            <Select
                                                borderRadius="full"
                                                placeholder="Sheet of Ice"
                                                {...field}
                                            >
                                                <option value="other">Other</option>
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                                <Box textColor="red.500" px={2}>
                                    <ErrorMessage name="sheetOfIce" />
                                </Box>
                            </Box>
                        </Grid>
                        <Field name="comments">
                            {({field, form}: FieldProps) => (
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Comment"
                                    />
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            type="submit"
                            isFullWidth
                            borderRadius="full"
                            bg="primary.green"
                            _hover={{ bg: "green.400" }}
                            _active={{ bg: "green.600" }}
                        >
                            Add Match
                        </Button>
                    </VStack>
                </Form>
            )}
        </Formik>
    )
}

export default Fields
