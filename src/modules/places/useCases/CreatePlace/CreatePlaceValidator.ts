import { CreatePlaceDTO } from '@modules/places/dtos/CreatePlaceDTO';
import { AppException } from '@shared/exceptions/AppException';
import { StatusCode } from '@shared/helpers/StatusCode';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export class CreatePlaceValidator {
    async validate(req: Request, _: Response, next: NextFunction) {
        const { name } = req.body;

        const createPlaceDTO = CreatePlaceDTO.create(name);

        const existsErrors = await validate(createPlaceDTO);

        if (existsErrors.length) {
            const fields = existsErrors.map((e) => e.property).join(', ');

            throw new AppException(`Fields: ${fields}`, StatusCode.BAD_REQUEST);
        }

        Object.assign(req.body, { createPlaceDTO });

        return next();
    }
}
