import { z } from "zod";
import { addressSchemaPostReq, realEstateSchema, realEstateSchemaBody } from "../schemas/realEstates.schemas";

type iRealEstate = z.infer<typeof realEstateSchema>;
type iAddressPostReq = z.infer<typeof addressSchemaPostReq>
type iRealEstateSchemaBody = z.infer<typeof realEstateSchemaBody>

export { iRealEstate, iAddressPostReq, iRealEstateSchemaBody }
