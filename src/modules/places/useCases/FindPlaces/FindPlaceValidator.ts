import { FindPlaceDTO } from '@modules/places/dtos/FindPlaceDTO';
import { AppException } from '@shared/exceptions/AppException';
import { normalizeString } from '@shared/helpers/normalizeStringHelper';
import { StatusCode } from '@shared/helpers/StatusCode';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export class FindPlaceValidator {
    async validate(req: Request, _: Response, next: NextFunction) {
        let { page, limit, search, order } = req.query;

        const queryPage = !page ? 1 : Number(page);
        const queryLimit = !limit ? 50 : Number(limit);
        const querySearch = !search ? 'undefined' : normalizeString(String(search));
        const queryOrder = !order ? 'undefined' : String(order);

        const findPlaceDTO = FindPlaceDTO.create(queryPage, queryLimit, querySearch, queryOrder);

        const existsErrors = await validate(findPlaceDTO);

        if (existsErrors.length) {
            const fields = existsErrors.map((e) => e.property).join(', ');

            throw new AppException(`Query invalid: ${fields}`, StatusCode.BAD_REQUEST);
        }

        Object.assign(req.body, { findPlaceDTO });

        return next();
    }
}
