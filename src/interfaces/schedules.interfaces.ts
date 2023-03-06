import { scheduleReqSchema, schedulesReturnSchema } from "../schemas/schedules.schemas";
import { z } from "zod";

type iScheduleReqSchema = z.infer<typeof scheduleReqSchema>;
type iScheduleReturnSchema = z.infer<typeof schedulesReturnSchema>

export { iScheduleReqSchema, iScheduleReturnSchema }
