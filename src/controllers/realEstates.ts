import { Request, Response } from "express";
import { postRealEstateService } from "../services/realEstates/postRealEstate.service";

const postRealEstateController = async(req: Request, res: Response): Promise<Response> => {
    const payload = req.body;
    const createdRealEstate = await postRealEstateService(payload);

    return res.status(201).json(createdRealEstate);
}

export { postRealEstateController }