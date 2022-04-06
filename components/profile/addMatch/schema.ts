import * as yup from 'yup'


const addMatchSchema = yup.object({
    currentTeam: yup.number().required(),
    matchResult: yup.string().required(),
    date: yup.date().required(),
    opponent: yup.number().required(),
    category: yup.number().required(),
    location: yup.string().required(),
    sheetOfIce: yup.string().required(),
    comments: yup.string().optional(),
})

export default addMatchSchema
