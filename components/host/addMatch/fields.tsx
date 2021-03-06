import {
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
    Input,
    Select as ChakraSelect,
    Textarea,
    VStack,
    FormErrorMessage,
    useRadioGroup,
} from '@chakra-ui/react'
import {
    Select,
    OptionBase,
} from 'chakra-react-select'
import type { HostInfo, TeamInfo } from '../../../lib/models'
import CurloButton from '../../buttons/CurloButton'
import moment from 'moment'
import ResultRadio from '../../profile/addMatch/resultRadio'
import schema from '../../profile/addMatch/schema'


const getInitialValues = (otherFields: { [key: string]: any } = {}) => ({
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

interface IceSheetSelectOptions extends OptionBase {
    label: string
    value: string
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
        onSubmit = async () => { },
    } = props

    const iceSheets = host?.iceSheets || []

    const resultOptions = ['Win', 'Loss', 'Tie']
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

    const iceSheetsOptions = [...iceSheets, 'N/A'].map((iceSheet) => ({
        value: iceSheet,
        label: iceSheet,
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
                                    {({ field, form }: FieldProps<string>) => {
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
                                                        const radioProps = getRadioProps({ value });
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
                                    {({ field, form }: FieldProps) => (
                                        <FormControl isInvalid={form.errors.date != undefined && form.touched.date != undefined}>
                                            <FormLabel htmlFor="date" srOnly>Date</FormLabel>
                                            <Input
                                                type="date"
                                                w="100%"
                                                borderRadius="full"
                                                {...field}
                                                id="date"
                                                max={moment().format("YYYY-MM-DD")}
                                            />
                                            <FormErrorMessage>Date of match is required</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                        </Grid>
                        <Flex
                            direction={{ base: "column", md: "row" }}
                            rowGap={4}
                            columnGap={4}
                            w="100%"
                        >
                            <Box w={{ base: "100%", md: "35%" }}>
                                <Field name="team1">
                                    {({ field, form }: FieldProps) => (
                                        <FormControl isInvalid={form.errors.team1 != undefined && form.touched.team1 != undefined}>
                                            <FormLabel htmlFor="team1" srOnly>Team 1</FormLabel>
                                            <Select<TeamSelectOptions>
                                                options={teamOptions}
                                                placeholder="Select team 1"
                                                closeMenuOnSelect
                                                focusBorderColor="blue.500"
                                                id="team1"
                                                instanceId="team1"
                                                onFocus={() => form.setFieldTouched("team1", true, true)}
                                                isOptionDisabled={(teams) => teams.value === form.values.team2}
                                                onChange={
                                                    (newValue, actionMeta) => {
                                                        form.values.team1 = newValue?.value
                                                        form.validateField("team1")

                                                    }
                                                }
                                            />
                                            <FormErrorMessage>First team is required</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box w={{ base: "100%", md: "35%" }}>
                                <Field name="team2">
                                    {({ field, form }: FieldProps) => (
                                        <FormControl isInvalid={form.errors.team2 != undefined && form.touched.team2 != undefined}>
                                            <FormLabel htmlFor="team2" srOnly>Team 2</FormLabel>
                                            <Select<TeamSelectOptions>
                                                options={teamOptions}
                                                placeholder="Select team 2"
                                                closeMenuOnSelect
                                                focusBorderColor="blue.500"
                                                id="team2"
                                                instanceId="team2"
                                                isOptionDisabled={(teams) => teams.value === form.values.team1}
                                                onFocus={() => form.setFieldTouched("team2", true, true)}
                                                onChange={
                                                    (newValue, actionMeta) => {
                                                        form.values.team2 = newValue?.value
                                                        form.validateField("team2")
                                                    }
                                                }
                                            />
                                            <FormErrorMessage>Second team is required</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                            </Box>
                            <Box w={{ base: "100%", md: "30%" }}>
                                <Field name="sheetOfIce">
                                    {({ field, form }: FieldProps) => (
                                        <FormControl isInvalid={form.errors.sheetOfIce != undefined && form.touched.sheetOfIce != undefined}>
                                            <FormLabel htmlFor="sheet-of-ice" srOnly>Ice sheet</FormLabel>
                                            <Select<IceSheetSelectOptions>
                                                options={iceSheetsOptions}
                                                placeholder="Ice sheet"
                                                closeMenuOnSelect
                                                focusBorderColor="blue.500"
                                                id="sheet-of-ice"
                                                instanceId="sheet-of-ice"
                                                onFocus={() => form.setFieldTouched("sheetOfIce", true, true)}
                                                onChange={
                                                    (newValue, actionMeta) => {
                                                        form.values.sheetOfIce = newValue?.value
                                                        form.validateField("sheetOfIce")
                                                    }
                                                }
                                            />
                                            <FormErrorMessage>Ice sheet is required</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                        </Flex>
                        <Field name="location">
                            {({ field, form }: FieldProps) => (
                                <FormControl hidden={true}>
                                    <ChakraSelect
                                        disabled
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
                        <Field name="comments">
                            {({ field, form }: FieldProps) => (
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
                        <CurloButton
                            buttonText="Add Match Result"
                            color="primary.green"
                            isFullWidth={true}
                            type="submit"
                            isSubmitting={isSubmitting}
                        />
                    </VStack>
                </Form>
            )}
        </Formik>
    )
}

export default Fields
