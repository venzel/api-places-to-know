import { UpdatePlaceDTO } from '@modules/places/dtos/UpdatePlaceDTO';
import { StatusCode } from '@shared/helpers/StatusCode';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatePlaceService } from './UpdatePlaceService';
import { instanceToPlain } from 'class-transformer';

export class UpdatePlaceController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const updatePlaceService = container.resolve(UpdatePlaceService);

        const bodyContext: UpdatePlaceDTO = req.body.updatePlaceDTO;

        const result = await updatePlaceService.execute(bodyContext);

        return res.status(StatusCode.OK).json(instanceToPlain(result));
    }
}
