import { getSchedulesByRealEstateService } from './../services/schedules/getSchedulesByRealEstate.service';
import { postScheduleService } from './../services/schedules/createSchedule.service';
import { Request, Response } from "express";

const postScheduleController = async(req: Request, res: Response): Promise<Response> => {
    const payload = req.body;
    const userId = req.loggedUser.id;
    const createdSchedule = await postScheduleService(payload, userId);

    return res.status(201).json(createdSchedule);
}

const getSchedulesByRealEstateController = async (req: Request, res: Response): Promise<Response> => {
    const realEstateId: number = parseInt(req.params.id);
    const schedules = await getSchedulesByRealEstateService(realEstateId);

    return res.status(200).json(schedules);
}

export { postScheduleController, getSchedulesByRealEstateController }
