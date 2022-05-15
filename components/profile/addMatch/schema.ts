import * as yup from 'yup'


const addMatchSchema = yup.object({
    team1: yup.number().required(),
    team2: yup.number().required(),
    matchResult: yup.string().required(),
    date: yup.date().required(),
    location: yup.number().required(),
    sheetOfIce: yup.string().required(),
    comments: yup.string().optional(),
})

export default addMatchSchema
