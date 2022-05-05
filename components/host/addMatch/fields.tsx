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
    GroupBase,
    ActionMeta,
} from 'chakra-react-select'

import schema from './schema'
import ResultRadio from './resultRadio'
import type { HostInfo, TeamInfo } from '../../../lib/models'


const getInitialValues = (otherFields: {[key: string]: any} = {}) => ({
    matchResult: 'Win',
    date: '',
    team1: '',
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


interface FieldsProps {
    host?: HostInfo
    teams?: TeamInfo[]
    onSubmit?: (values: ReturnType<typeof getInitialValues>) => Promise<void>
}


const Fields = (props: FieldsProps): JSX.Element => {
    const {
        host = null,
        teams = [],
        onSubmit = async () => {},
    } = props

    const iceSheets = host?.iceSheets || []

    const resultOptions = [ 'Win', 'Loss', 'Tie' ]
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'matchResult',
        defaultValue: 'Win',
        onChange: (val) => console.log(val)
    })
    const group = getRootProps()
    const teamOptions = teams.map((t) => ({
        value: t.teamId,
        label: t.name,
    }))

    return (
        <Formik
            initialValues={getInitialValues({ location: host?.hostId })}
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
                                <Field name="team1">
                                    {({field, form}: FieldProps) => (
                                        <FormControl>
                                            <FormLabel htmlFor="team1" srOnly>Team 1</FormLabel>
                                            <Select<TeamSelectOptions>
                                                options={teamOptions}
                                                placeholder="Select team 1"
                                                closeMenuOnSelect
                                                focusBorderColor="blue.500"
                                                id="team1"
                                                instanceId="team1"
                                                onFocus={() => form.setFieldTouched("team1", true, true)}
                                                onChange={
                                                    (newValue, actionMeta) => {
                                                        form.values.team1 = newValue?.value
                                                        form.validateField("team1")
                                                    }
                                                }
                                            />
                                        </FormControl>
                                    )}
                                </Field>
                                <Box textColor="red.500" px={2}>
                                    <ErrorMessage name="team1" />
                                </Box>
                            </Box>
                            <Box w="100%">
                                <Field name="team2">
                                    {({field, form}: FieldProps) => (
                                        <FormControl>
                                            <FormLabel htmlFor="team2" srOnly>Team 2</FormLabel>
                                            <Select<TeamSelectOptions>
                                                options={teamOptions}
                                                placeholder="Select team 2"
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
                                    <ErrorMessage name="team2" />
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
                                            <ChakraSelect
                                                borderRadius="full"
                                                placeholder="Location"
                                                {...field}
                                                value={host?.hostId}
                                                id="location"
                                            >
                                                <option key={`${host?.hostId}`} value={host?.hostId}>
                                                    {host?.organization}
                                                </option>
                                            </ChakraSelect>
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
                                            <ChakraSelect
                                                disabled={!values.location}
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
                                            </ChakraSelect>
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
