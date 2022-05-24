import * as yup from 'yup'
import libphonenumber from 'google-libphonenumber'
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance()

const zipRE = /^\d{5}(?:[- ]?\d{4})?$/

const hostSignupSchema = yup.object({
    organization: yup.string().required('Enter the organizations name'),
    website: yup.string().required('Enter the hosts website').url('Website must start with https:// ').nullable(),
    countryCode: yup.string().required('Enter a country code'),
    phone: yup
        .string()
        .required('Enter a phone number')
        .test('is-phone-valid', 'Enter a valid phone number', function (value) {
            let countryCode = this.parent.countryCode
            try {
                return value
                    && countryCode
                    && phoneUtil.isValidNumberForRegion(phoneUtil.parse(value, countryCode), countryCode)
            }
            catch(err) {
                console.log(err)
                return false
            }
        }),
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
