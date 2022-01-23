import { UpdatePlaceDTO } from '@modules/places/dtos/UpdatePlaceDTO';
import { AppException } from '@shared/exceptions/AppException';
import { StatusCode } from '@shared/helpers/StatusCode';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export class UpdatePlaceValidator {
    async validate(req: Request, _: Response, next: NextFunction) {
        const { id } = req.params;

        const { name } = req.body;

        const updatePlaceDTO = UpdatePlaceDTO.update(id, name);

        const existsErrors = await validate(updatePlaceDTO);

        if (existsErrors.length) {
            const fields = existsErrors.map((e) => e.property).join(', ');

            throw new AppException(`Fields: ${fields}`, StatusCode.BAD_REQUEST);
        }

        Object.assign(req.body, { updatePlaceDTO });

        return next();
    }
}
