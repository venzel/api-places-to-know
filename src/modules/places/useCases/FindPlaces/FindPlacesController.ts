import { FindPlaceDTO } from '@modules/places/dtos/FindPlaceDTO';
import { StatusCode } from '@shared/helpers/StatusCode';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindPlacesService } from './FindPlacesService';
import { instanceToPlain } from 'class-transformer';

export class FindPlacesController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const findPlacesService = container.resolve(FindPlacesService);

        const bodyContext: FindPlaceDTO = req.body.findPlaceDTO;

        let results = await findPlacesService.execute(bodyContext);

        return res.status(StatusCode.OK).json(instanceToPlain(results));
    }
}
