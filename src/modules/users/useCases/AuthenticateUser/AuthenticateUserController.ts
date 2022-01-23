import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { AuthenticateUserService } from './AuthenticateUserService';
import { StatusCode } from '@shared/helpers/StatusCode';
import { AuthenticateUserDTO } from '@modules/users/dtos/AuthenticateUserDTO';

export class AuthenticateUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const authenticateUserService = container.resolve(AuthenticateUserService);

        const bodyContext: AuthenticateUserDTO = req.body.authenticateUserDTO;

        const token = await authenticateUserService.execute(bodyContext);

        return res.status(StatusCode.OK).json(token);
    }
}
