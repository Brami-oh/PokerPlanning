import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

export const pokerPlanningSchema = yup
    .object({
        username: yup.string().required(),
        vote: yup.number().positive().integer().required(),
    })
    .required()

export const pokerPlanningSchemaResolver = yupResolver(pokerPlanningSchema)