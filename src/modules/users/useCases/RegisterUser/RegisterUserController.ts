import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { StatusCode } from '@shared/helpers/StatusCode';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RegisterUserService } from './RegisterUserService';

export class RegisterUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const service = container.resolve(RegisterUserService);

        const bodyContext: CreateUserDTO = req.body.createUserDTO;

        const result = await service.execute(bodyContext);

        return res.status(StatusCode.CREATED).json(instanceToPlain(result));
    }
}
