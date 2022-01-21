import { StatusCode } from '@shared/helpers/StatusCode';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindPlacesService } from './FindPlacesService';

export class FindPlacesController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { name } = req.query;

        const findPlacesService = container.resolve(FindPlacesService);

        const result = await findPlacesService.execute(String(name));

        return res.status(StatusCode.OK).json(result);
    }
}
