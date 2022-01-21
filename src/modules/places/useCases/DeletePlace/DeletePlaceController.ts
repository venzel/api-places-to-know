import { StatusCode } from '@shared/helpers/StatusCode';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeletePlaceService } from './DeletePlaceService';

export class DeletePlaceController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const placeId = req.params.id;

        const deletePlaceService = container.resolve(DeletePlaceService);

        const result = await deletePlaceService.execute(placeId);

        return res.status(StatusCode.OK).json(result);
    }
}
