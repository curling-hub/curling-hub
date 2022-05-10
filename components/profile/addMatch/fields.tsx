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
    Select as ChakraSelect,
    Stack,
    Spacer,
    Textarea,
    VStack,
    useRadioGroup,
} from '@chakra-ui/react'
import {
    Select,
    OptionBase,
} from 'chakra-react-select'

import schema from './schema'
import ResultRadio from './resultRadio'
import type { HostInfo, TeamInfo } from '../../../lib/models'

import { RowDataPacket } from 'mysql2'
import { t } from '@chakra-ui/styled-system/dist/declarations/src/utils'


const getInitialValues = (otherFields: any = {}) => ({
    matchResult: 'Win',
    date: '',
    team2: '',
    location: '',
    sheetOfIce: '',
    comments: '',
    ...otherFields,
})


interface TeamSelectOptions extends OptionBase {
    label: string
    value: number
}

interface HostSelectOptions extends OptionBase {
    label: string
    value: string
}

interface IceSheetSelectOptions extends OptionBase {
    label: string
    value: string
}


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

    const filteredTeamOptions = teams.filter((team) => team.teamId != currentTeam.teamId);//Not sure if using right fields / can't really use the page.

    const teamOptions = filteredTeamOptions.map((team) => {
        return {value: team.teamId,label: team.name};
    })

    {/* old
    const teamOptions = teams.map((t) => ({ 
        value: t.teamId,
        label: t.name,
    }))*/}
    const hostOptions = hosts.map((h) => ({
        value: h.hostId,
        label: h.organization,
    }))
    hostOptions.push({ value: 'other', label: 'other' })
    const getIceSheetsOptions = (iceSheets: any[]) => (
        [...iceSheets, 'other'].map((iceSheet: string) => ({
            value: iceSheet,
            label: iceSheet,
        }))
    )

    return (
        <Formik
            initialValues={getInitialValues({ team1: currentTeam.teamId })}
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
                                <Field name="team2">
                                    {({field, form}: FieldProps) => (
                                        <FormControl>
                                            <FormLabel htmlFor="team2" srOnly>Opponent</FormLabel>
                                            <Select<TeamSelectOptions>
                                                options={teamOptions}
                                                placeholder="Select opponent team"
                                                closeMenuOnSelect
                                                focusBorderColor="blue.500"
                                                id="team2"
                                                instanceId="team2"
                                                onFocus={() => form.setFieldTouched("team2", true, true)}
                                                onChange={
                                                    (newValue, actionMeta) => {
                                                        form.values.team2 = newValue?.value
                                                        form.validateField("team2")
                                                    }
                                                }
                                            />
                                        </FormControl>
                                    )}
                                </Field>
                                <Box textColor="red.500" px={2}>
                                    <ErrorMessage name="opponent" />
                                </Box>
                            </Box>
                        </Grid>
                        <Flex
                            direction={{ base: "column", md: "row" }}
                            rowGap={4}
                            columnGap={4}
                            w="100%"
                        >
                            <Box w={{ base: "100%", md: "70%" }}>
                                <Field name="location">
                                    {({field, form}: FieldProps) => (
                                        <FormControl>
                                            <FormLabel htmlFor="location" srOnly>Location</FormLabel>
                                            <Select<HostSelectOptions>
                                                options={hostOptions}
                                                placeholder="Select host location"
                                                closeMenuOnSelect
                                                focusBorderColor="blue.500"
                                                id="location"
                                                instanceId="location"
                                                onFocus={() => form.setFieldTouched("location", true, true)}
                                                onChange={
                                                    (newValue, actionMeta) => {
                                                        form.values.location = newValue?.value
                                                        newValue && onLocationChange(newValue.value)
                                                        form.validateField("location")
                                                    }
                                                }
                                            />
                                        </FormControl>
                                    )}
                                </Field>
                                <Box textColor="red.500" px={2}>
                                    <ErrorMessage name="location" />
                                </Box>
                            </Box>
                            <Box w={{ base: "100%", md: "30%" }}>
                                <Field name="sheetOfIce">
                                    {({field, form}: FieldProps) => (
                                        <FormControl>
                                            <FormLabel htmlFor="sheet-of-ice" srOnly>Sheet of Ice</FormLabel>
                                            <Select<IceSheetSelectOptions>
                                                isDisabled={!values.location || values.location === 'other' || fetchingIceSheets}
                                                options={getIceSheetsOptions(iceSheets)}
                                                placeholder="Ice sheet"
                                                closeMenuOnSelect
                                                focusBorderColor="blue.500"
                                                id="sheet-of-ice"
                                                instanceId="sheet-of-ice"
                                                onFocus={() => form.setFieldTouched("sheet-of-ice", true, true)}
                                                onChange={
                                                    (newValue, actionMeta) => {
                                                        form.values.sheetOfIce = newValue?.value
                                                    }
                                                }
                                            />
                                        </FormControl>
                                    )}
                                </Field>
                                <Box textColor="red.500" px={2}>
                                    <ErrorMessage name="sheetOfIce" />
                                </Box>
                            </Box>
                        </Flex>
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
