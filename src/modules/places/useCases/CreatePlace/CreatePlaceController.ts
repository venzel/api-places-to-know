import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreatePlaceService } from './CreatePlaceService';
import { StatusCode } from '@shared/helpers/StatusCode';
import { CreatePlaceDTO } from '@modules/places/dtos/CreatePlaceDTO';
import { instanceToPlain } from 'class-transformer';

export class CreatePlaceController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const createPlaceService = container.resolve(CreatePlaceService);

        const bodyContext: CreatePlaceDTO = req.body.createPlaceDTO;

        const result = await createPlaceService.execute(bodyContext);

        return res.status(StatusCode.CREATED).json(instanceToPlain(result));
    }
}
