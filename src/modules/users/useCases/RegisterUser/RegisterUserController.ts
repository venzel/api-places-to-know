import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { RegisterUserService } from './RegisterUserService';
import { StatusCode } from '@shared/helpers/StatusCode';
import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';

export class RegisterUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const service = container.resolve(RegisterUserService);

        const createUserDTO = req.body.createUserDTO as CreateUserDTO;

        const user = await service.execute(createUserDTO);

        return res.status(StatusCode.CREATED).json({ user });
    }
}
