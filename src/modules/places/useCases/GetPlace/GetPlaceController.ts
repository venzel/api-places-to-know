import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { GetPlaceService } from './GetPlaceService';
import { StatusCode } from '@shared/helpers/StatusCode';

export class GetPlaceController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const placeId = req.params.id;

        const showPlaceService = container.resolve(GetPlaceService);

        const result = await showPlaceService.execute(placeId);

        return res.status(StatusCode.OK).json(result);
    }
}
