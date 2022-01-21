import { StatusCode } from '@shared/helpers/StatusCode';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ShowPlaceService } from './ShowPlaceService';

export class ShowPlaceController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const placeId = req.params.id;

        const showPlaceService = container.resolve(ShowPlaceService);

        const result = await showPlaceService.execute(placeId);

        return res.status(StatusCode.OK).json(result);
    }
}
