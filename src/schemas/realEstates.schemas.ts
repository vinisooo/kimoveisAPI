import { z } from "zod";

const addressSchema = z.object({
    id: z.number(),
    street: z.string().max(25),
    zipCode: z.string().max(8),
    number: z.string().max(7).optional().nullable(),
    city: z.string().max(20),
    state: z.string().max(2)
})

const addressSchemaPostReq = addressSchema.omit({id: true});

const realEstateSchema = z.object({
    id: z.number(),
    sold: z.boolean().default(false).optional(),
    value: z.string().or(z.number().multipleOf(0.01).positive()),
    size: z.number().positive(),
    createdAt: z.string(),
    updatedAt: z.string(),
    address: addressSchemaPostReq,
    addressId: z.number(),
    categoryId: z.number().optional().nullable().default(null)
})

const realEstateSchemaReq = realEstateSchema.omit({id: true, createdAt: true, updatedAt: true});
const realEstateSchemaPostReq = realEstateSchemaReq.omit({addressId: true });
const realEstateSchemaPostNoCategoryId = realEstateSchemaPostReq.omit({categoryId: true});

export { realEstateSchema, realEstateSchemaPostReq, addressSchema, addressSchemaPostReq, realEstateSchemaPostNoCategoryId };
