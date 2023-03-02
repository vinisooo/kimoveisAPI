import { noPasswordUserSchema, postUserReqSchema, userSchema } from "../schemas/users.schemas";
import { z } from "zod";

type iUser = z.infer<typeof userSchema>;
type iPostUserReq = z.infer<typeof postUserReqSchema>;
type iNoPasswordUser = z.infer<typeof noPasswordUserSchema>

export { iUser, iPostUserReq, iNoPasswordUser };
