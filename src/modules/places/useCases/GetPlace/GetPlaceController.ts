import { GetPlaceDTO } from '@modules/places/dtos/GetPlaceDTO';
import { StatusCode } from '@shared/helpers/StatusCode';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetPlaceService } from './GetPlaceService';

export class GetPlaceController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const showPlaceService = container.resolve(GetPlaceService);

        const getPlaceDTO = req.body.getPlaceDTO as GetPlaceDTO;

        const result = await showPlaceService.execute(getPlaceDTO.id);

        return res.status(StatusCode.OK).json(result);
    }
}
