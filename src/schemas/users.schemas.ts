import { z } from "zod";

const userSchema = z.object({
    id: z.number(),
    name: z.string().max(45),
    email: z.string().email().max(45),
    password: z.string().max(120),
    admin: z.boolean().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable()
})

const postUserReqSchema = userSchema.omit({createdAt: true, updatedAt: true, deletedAt: true, id: true});
const loginReqSchema = postUserReqSchema.omit({admin: true, name: true})
const noPasswordUserSchema = userSchema.omit({password: true});

export { userSchema, postUserReqSchema, noPasswordUserSchema, loginReqSchema }
