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
    FormLabel,
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
import type { Category, HostInfo, TeamInfo } from '../../../lib/models'


const getInitialValues = () => ({
    matchResult: 'Win',
    date: '',
    opponent: '',
    category: '',
    location: '',
    sheetOfIce: '',
    comments: '',
})


interface FieldsProps {
    categories?: Category[]
    hosts?: HostInfo[]
    teams?: TeamInfo[]
    onSubmit?: (values: ReturnType<typeof getInitialValues>) => Promise<void>
}


const Fields = (props: FieldsProps): JSX.Element => {
    const {
        categories = [],
        hosts = [],
        teams = [],
        onSubmit = async () => {},
    } = props

    const resultOptions = [ 'Win', 'Loss', 'Tie' ]
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'matchResult',
        defaultValue: 'Win',
        onChange: (val) => console.log(val)
    })
    const group = getRootProps()

    return (
        <Formik
            initialValues={getInitialValues()}
            validationSchema={schema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
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
                                        return (
                                            <FormControl>
                                                <Flex justifyContent="space-between" {...group}>
                                                    {resultOptions.map((value) => (
                                                        <ResultRadio
                                                            key={value}
                                                            {...getRadioProps({value})}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                const radioProps = getRadioProps({value});
                                                                radioProps.onChange && radioProps.onChange(e);
                                                            }}
                                                            name={field.name}
                                                            id={value.toLowerCase()}
                                                        >
                                                            <FormLabel htmlFor={value.toLowerCase()} m='auto'>{value}</FormLabel>
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
                                                {teams.map((val) => (
                                                    <option key={`${val.teamId}`} value={val.teamId}>
                                                        {val.name}
                                                    </option>
                                                ))}
                                                <option key="other" value="other">Other</option>
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
                                                {categories.map((val) => (
                                                    <option key={`${val.categoryId}`} value={val.categoryId}>
                                                        {val.name}
                                                    </option>
                                                ))}
                                                <option key="other" value="other">Other</option>
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
                                                {hosts.map((val) => (
                                                    <option key={`${val.hostId}`} value={val.hostId}>
                                                        {val.name}
                                                    </option>
                                                ))}
                                                <option key="other" value="other">Other</option>
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
                            disabled={isSubmitting}
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
