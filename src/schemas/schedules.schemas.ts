import { z } from "zod";
import { realEstateSchema } from "./realEstates.schemas";
import { userSchema } from "./users.schemas";

const scheduleReqSchema = z.object({
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number().int()
})

const schedulesReturnSchema = z.object({
    date: z.string(),
    hour: z.string(),
    realEstate: realEstateSchema,
    user: userSchema
})

export { scheduleReqSchema, schedulesReturnSchema };
