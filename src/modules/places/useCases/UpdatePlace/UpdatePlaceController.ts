import { StatusCode } from '@shared/helpers/StatusCode';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatePlaceService } from './UpdatePlaceService';

export class UpdatePlaceController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const classeId = req.params.id;

        const { name } = req.body;

        const updatePlaceService = container.resolve(UpdatePlaceService);

        const data = {
            name,
        };

        const result = await updatePlaceService.execute(data, classeId);

        return res.status(StatusCode.OK).json(result);
    }
}
