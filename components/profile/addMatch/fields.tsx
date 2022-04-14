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
import type { HostInfo, TeamInfo } from '../../../lib/models'


const getInitialValues = (otherFields: any = {}) => ({
    matchResult: 'Win',
    date: '',
    opponent: '',
    location: '',
    sheetOfIce: '',
    comments: '',
    ...otherFields,
})


interface FieldsProps {
    currentTeam?: TeamInfo
    hosts?: HostInfo[]
    teams?: TeamInfo[]
    onSubmit?: (values: ReturnType<typeof getInitialValues>) => Promise<void>
    fetchIceSheetsByHostId?: (hostId: string) => Promise<any[]>
}


const Fields = (props: FieldsProps): JSX.Element => {
    const {
        currentTeam = {} as TeamInfo,
        fetchIceSheetsByHostId = async (_) => [],
        hosts = [],
        teams = [],
        onSubmit = async () => {},
    } = props

    const [ fetchingIceSheets, setFetchingIceSheets ] = useState(false)
    const [ iceSheets, setIceSheets ] = useState<any[]>([])
    const onLocationChange = async (hostId: string) => {
        setFetchingIceSheets(true)
        try {
            const iceSheets = await fetchIceSheetsByHostId(hostId)
            setIceSheets(iceSheets)
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
            initialValues={getInitialValues({ currentTeam: currentTeam.teamId })}
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
                            templateColumns="repeat(1, 1fr)"
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
                                    {({field, form}: FieldProps) => (
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
                            Add Match Result
                        </Button>
                    </VStack>
                </Form>
            )}
        </Formik>
    )
}

export default Fields
