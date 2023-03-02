import { z } from "zod";

const userSchema = z.object({
    name: z.string().max(45),
    email: z.string().email().max(45),
    password: z.string().max(120),
    admin: z.boolean().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.string().datetime()
})

const postUserReqSchema = userSchema.omit({createdAt: true, updatedAt: true, deletedAt: true})
const noPasswordUserSchema = userSchema.omit({password: true});

export { userSchema, postUserReqSchema, noPasswordUserSchema }
