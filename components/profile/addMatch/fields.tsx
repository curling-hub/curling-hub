import { useState } from 'react'
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

    const [ fetchingIceSheets, setFetchingIceSheets ] = useState(false)
    const [ iceSheets, setIceSheets ] = useState<any[]>([])
    const onLocationChange = async (hostId: string) => {
        setFetchingIceSheets(true)
        try {
            const res = await fetch(`/api/location/${hostId}/info`)
            if (res.status === 200) {
                const hostInfo = await res.json()
                setIceSheets(hostInfo.data.iceSheets || [])
            }
        } catch (error: any) {
            console.log(error)
        } finally {
            setFetchingIceSheets(false)
        }
    }

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
            {({ isSubmitting, values }) => (
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
                                                        <FormLabel
                                                            key={value}
                                                            htmlFor={value.toLowerCase()}
                                                            srOnly
                                                        >
                                                            {value}
                                                        </FormLabel>
                                                    ))}
                                                    {resultOptions.map((value) => {
                                                        const radioProps = getRadioProps({value});
                                                        return (<ResultRadio
                                                            key={value}
                                                            {...radioProps}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                radioProps.onChange && radioProps.onChange(e);
                                                            }}
                                                            name={field.name}
                                                            id={value.toLowerCase()}
                                                        >
                                                            <span>{value}</span>
                                                        </ResultRadio>)
                                                    })}
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
                                            <FormLabel htmlFor="date" srOnly>Date</FormLabel>
                                            <Input
                                                type="date"
                                                w="100%"
                                                borderRadius="full"
                                                {...field}
                                                id="date"
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
                                            <FormLabel htmlFor="opponent" srOnly>Opponent</FormLabel>
                                            <Select
                                                borderRadius="full"
                                                placeholder="Opponent"
                                                {...field}
                                                id="opponent"
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
                                            <FormLabel htmlFor="category" srOnly>Category</FormLabel>
                                            <Select
                                                borderRadius="full"
                                                placeholder="Category"
                                                {...field}
                                                id="category"
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
                                            <FormLabel htmlFor="location" srOnly>Location</FormLabel>
                                            <Select
                                                borderRadius="full"
                                                placeholder="Location"
                                                {...field}
                                                onChange={(e) => {
                                                    onLocationChange(e.target.value)
                                                    field.onChange(e)
                                                }}
                                                id="location"
                                            >
                                                {hosts.map((val) => (
                                                    <option key={`${val.hostId}`} value={val.hostId}>
                                                        {val.organization}
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
                                    {iceSheets.length > 0 ? ({field, form}: FieldProps) => (
                                        <FormControl>
                                            <FormLabel htmlFor="sheet-of-ice" srOnly>Sheet of Ice</FormLabel>
                                            <Select
                                                disabled={!values.location || values.location === 'other' || fetchingIceSheets}
                                                borderRadius="full"
                                                placeholder="Sheet of Ice"
                                                {...field}
                                                id="sheet-of-ice"
                                            >
                                                {iceSheets.map((val) => (
                                                    <option key={`${val}`} value={val}>
                                                        {val}
                                                    </option>
                                                ))}
                                                <option value="other">Other</option>
                                            </Select>
                                        </FormControl>
                                    ) : () => (<></>)}
                                </Field>
                                <Box textColor="red.500" px={2}>
                                    <ErrorMessage name="sheetOfIce" />
                                </Box>
                            </Box>
                        </Grid>
                        <Field name="comments">
                            {({field, form}: FieldProps) => (
                                <FormControl>
                                    <FormLabel htmlFor="comment" srOnly>Comment</FormLabel>
                                    <Textarea
                                        {...field}
                                        placeholder="Comment"
                                        id="comment"
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
