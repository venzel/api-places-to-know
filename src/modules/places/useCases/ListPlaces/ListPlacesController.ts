import { StatusCode } from '@shared/helpers/StatusCode';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListPlacesService } from './ListPlacesService';

export class ListPlacesController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const listPlacesService = container.resolve(ListPlacesService);

        const result = await listPlacesService.execute();

        return res.status(StatusCode.OK).json(result);
    }
}
