import * as yup from 'yup'

const phoneRE = /^(?:(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/g;
const zipRE = /^\d{5}(?:[- ]?\d{4})?$/

const hostSignupSchema = yup.object({
    organization: yup.string().required('Enter the organizations name'),
    website: yup.string().required('Enter the hosts website').url('Website must start with https:// ').nullable(),
    phone: yup.string().matches(phoneRE, 'Enter a valid phone number').required('Enter a phone number'),
    countryCode: yup.string().required('Enter a country code'),
    address: yup.string().required('Enter the hosts address'),
    address2: yup.string().optional(),
    city: yup.string().required('Enter the city'),
    state: yup.string().required('Enter the state'),
    zip: yup.string().matches(zipRE, 'Enter a valid zipcode').required('Enter zipcode'),
    country: yup.string().required('Enter the country'),
    iceSheets: yup.array(yup.string().required('Enter number of ice sheets')).required('Enter Ice sheet'),
    namingScheme: yup.string().required(),
    agreed: yup.boolean().required().isTrue("Please agree to the terms of service and privacy policy"),
})

export default hostSignupSchema
