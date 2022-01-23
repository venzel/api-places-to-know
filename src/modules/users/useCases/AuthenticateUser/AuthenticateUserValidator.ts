import { AuthenticateUserDTO } from '@modules/users/dtos/AuthenticateUserDTO';
import { AppException } from '@shared/exceptions/AppException';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { StatusCode } from '@shared/helpers/StatusCode';

export class AuthenticateUserValidator {
    async validate(req: Request, _: Response, next: NextFunction) {
        const { email, password } = req.body;

        const authenticateUserDTO = AuthenticateUserDTO.create(email, password);

        const existsErrors = await validate(authenticateUserDTO);

        if (existsErrors.length) {
            const fields = existsErrors.map((e) => e.property).join(', ');

            throw new AppException(`Erros in fields: ${fields}`, StatusCode.BAD_REQUEST);
        }

        Object.assign(req.body, { authenticateUserDTO });

        return next();
    }
}
