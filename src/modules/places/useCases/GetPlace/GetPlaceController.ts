import { GetPlaceDTO } from '@modules/places/dtos/GetPlaceDTO';
import { StatusCode } from '@shared/helpers/StatusCode';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetPlaceService } from './GetPlaceService';
import { instanceToPlain } from 'class-transformer';

export class GetPlaceController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const showPlaceService = container.resolve(GetPlaceService);

        const bodyContext: GetPlaceDTO = req.body.getPlaceDTO;

        const result = await showPlaceService.execute(bodyContext.id);

        return res.status(StatusCode.OK).json(instanceToPlain(result));
    }
}
