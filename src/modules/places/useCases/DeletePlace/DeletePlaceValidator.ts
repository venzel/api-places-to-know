import { GetPlaceDTO } from '@modules/places/dtos/GetPlaceDTO';
import { AppException } from '@shared/exceptions/AppException';
import { StatusCode } from '@shared/helpers/StatusCode';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export class DeletePlaceValidator {
    async validate(req: Request, _: Response, next: NextFunction) {
        const { id } = req.params;

        const getPlaceDTO = GetPlaceDTO.create(id);

        const existsErrors = await validate(getPlaceDTO);

        if (existsErrors.length) {
            const fields = existsErrors.map((e) => e.property).join(', ');

            throw new AppException(`Paramn: ${fields}`, StatusCode.BAD_REQUEST);
        }

        Object.assign(req.body, { getPlaceDTO });

        return next();
    }
}
