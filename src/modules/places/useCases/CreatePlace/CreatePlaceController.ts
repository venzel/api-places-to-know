import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreatePlaceService } from './CreatePlaceService';
import { StatusCode } from '@shared/helpers/StatusCode';

export class CreatePlaceController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;

        const createPlaceService = container.resolve(CreatePlaceService);

        const data = {
            name,
        };

        const result = await createPlaceService.execute(data);

        return res.status(StatusCode.CREATED).json(result);
    }
}
