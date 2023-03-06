import { getAllRealEstatesService } from '../services/realEstates/getAllRealEstates.service';
import { Request, Response } from "express";
import { postRealEstateService } from "../services/realEstates/postRealEstate.service";

const postRealEstateController = async(req: Request, res: Response): Promise<Response> => {
    const payload = req.body;
    const createdRealEstate = await postRealEstateService(payload);

    return res.status(201).json(createdRealEstate);
}

const getAllRealEstatesController = async (req: Request, res: Response): Promise<Response> => {
    const allRealEstates = await getAllRealEstatesService();
    return res.status(200).json(allRealEstates);
}

export { postRealEstateController, getAllRealEstatesController }