import { loginReqSchema, noPasswordUserSchema, postUserReqSchema, userSchema, } from "../schemas/users.schemas";
import { z } from "zod";

type iUser = z.infer<typeof userSchema>;
type iPostUserReq = z.infer<typeof postUserReqSchema>;
type iNoPasswordUser = z.infer<typeof noPasswordUserSchema>
type iLoginReqSchema = z.infer<typeof loginReqSchema>

export { iUser, iPostUserReq, iNoPasswordUser, iLoginReqSchema };
