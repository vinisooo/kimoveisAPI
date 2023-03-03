import { z } from "zod";
import { categoryReqSchema } from "../schemas/categories.schemas";

export type iCategoryReq =  z.infer<typeof categoryReqSchema>;
