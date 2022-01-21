import { AuthUserMiddleware } from '@modules/users/middlewares/AuthUserMiddleware';
import { Router } from 'express';
import { CreatePlaceController } from './CreatePlaceController';
import { CreatePlaceValidator } from './CreatePlaceValidator';

export class CreatePlaceMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { validate } = new CreatePlaceValidator();
        const { authenticate } = new AuthUserMiddleware();
        const { handle } = new CreatePlaceController();

        router[method](path, validate, authenticate, handle);
    }
}
