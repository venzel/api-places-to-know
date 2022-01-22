import { GetPlaceDTO } from '@modules/places/dtos/GetPlaceDTO';
import { StatusCode } from '@shared/helpers/StatusCode';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeletePlaceService } from './DeletePlaceService';
import { instanceToPlain } from 'class-transformer';

export class DeletePlaceController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const deletePlaceService = container.resolve(DeletePlaceService);

        const bodyContext: GetPlaceDTO = req.body.getPlaceDTO;

        const result = await deletePlaceService.execute(bodyContext.id);

        return res.status(StatusCode.OK).json(instanceToPlain(result));
    }
}
