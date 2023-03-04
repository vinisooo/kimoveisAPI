import { z } from "zod";
import { categorySchema } from "./categories.schemas";

const addressSchema = z.object({
    id: z.number(),
    street: z.string().max(25),
    zipCode: z.string().max(8),
    number: z.string().max(8).optional().nullable(),
    city: z.string().max(20),
    state: z.string().max(2)
})

const addressSchemaPostReq = addressSchema.omit({id: true});

const realEstateSchema = z.object({
    id: z.number(),
    sold: z.boolean().default(false),
    value: z.string().or(z.number().multipleOf(0.01).positive()),
    size: z.number().positive(),
    createdAt: z.string(),
    updatedAt: z.string(),
    address: addressSchema,
    category: categorySchema
})

const realEstateSchemaReq = realEstateSchema.omit({id: true, createdAt: true, updatedAt: true});
const realEstateSchemaBody = realEstateSchemaReq.extend({categoryId: z.number().optional(), address: addressSchemaPostReq}).omit({category: true, sold: true})

const realEstateSchemaPostReqNoAdd = realEstateSchema.omit({address: true });


export { realEstateSchema , addressSchema, addressSchemaPostReq, realEstateSchemaPostReqNoAdd, realEstateSchemaBody };
