import { FindPlaceDTO } from '@modules/places/dtos/FindPlaceDTO';
import { AppException } from '@shared/exceptions/AppException';
import { StatusCode } from '@shared/helpers/StatusCode';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export class FindPlaceValidator {
    async validate(req: Request, _: Response, next: NextFunction) {
        const { name } = req.query;

        const findPlaceDTO = FindPlaceDTO.create(String(name));

        const existsErrors = await validate(findPlaceDTO);

        if (existsErrors.length) {
            const fields = existsErrors.map((e) => e.property).join(', ');

            throw new AppException(`Query invalid: ${fields}`, StatusCode.BAD_REQUEST);
        }

        Object.assign(req.body, { findPlaceDTO });

        return next();
    }
}
