import * as yup from 'yup'

const phoneRE = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/g;
const zipRE = /^\d{5}(?:[- ]?\d{4})?$/

const hostSignupSchema = yup.object({
    organization: yup.string().required(),
    website: yup.string().required().url().nullable(),
    phone: yup.string().matches(phoneRE, 'Invalid phone number').required(),
    phoneType: yup.string().required("Phone type is a required field"),
    address: yup.string().required(),
    address2: yup.string().optional(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().matches(zipRE, 'Invalid zip code').required(),
    country: yup.string().required(),
    agreed: yup.boolean().required().isTrue("Please agree to the terms of service and privacy policy"),
})

export default hostSignupSchema
