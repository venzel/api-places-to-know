import { UpdatePlaceDTO } from '@modules/places/dtos/UpdatePlaceDTO';
import { StatusCode } from '@shared/helpers/StatusCode';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatePlaceService } from './UpdatePlaceService';

export class UpdatePlaceController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const updatePlaceService = container.resolve(UpdatePlaceService);

        const updatePlaceDTO = req.body.updatePlaceDTO as UpdatePlaceDTO;

        const result = await updatePlaceService.execute(updatePlaceDTO);

        return res.status(StatusCode.OK).json(result);
    }
}
