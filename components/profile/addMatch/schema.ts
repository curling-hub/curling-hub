import * as yup from 'yup'


const addMatchSchema = yup.object({
    matchResult: yup.string().required(),
    date: yup.date().required(),
    opponent: yup.string().required(),
    category: yup.string().required(),
    location: yup.string().required(),
    sheetOfIce: yup.string().required(),
    comments: yup.string().optional(),
})

export default addMatchSchema
