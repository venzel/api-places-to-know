import { FindPlaceDTO } from '@modules/places/dtos/FindPlaceDTO';
import { StatusCode } from '@shared/helpers/StatusCode';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindPlacesService } from './FindPlacesService';

export class FindPlacesController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const findPlacesService = container.resolve(FindPlacesService);

        const findPlaceDTO = req.body.findPlaceDTO as FindPlaceDTO;

        const result = await findPlacesService.execute(findPlaceDTO);

        return res.status(StatusCode.OK).json(result);
    }
}
