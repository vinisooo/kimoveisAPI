import { z } from "zod";
import { addressSchemaPostReq, realEstateSchema, realEstateSchemaPostReq } from "../schemas/realEstates.schemas";

type iRealEstate = z.infer<typeof realEstateSchema>;
type iRealEstatePostReq = z.infer<typeof realEstateSchemaPostReq>;
type iAddressPostReq = z.infer<typeof addressSchemaPostReq>

export { iRealEstate, iRealEstatePostReq, iAddressPostReq }
