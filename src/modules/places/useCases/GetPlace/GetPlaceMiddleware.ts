import { AuthUserMiddleware } from '@modules/users/middlewares/AuthUserMiddleware';
import { Router } from 'express';
import { GetPlaceController } from './GetPlaceController';
import { GetPlaceValidator } from './GetPlaceValidator';

export class GetPlaceMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthUserMiddleware();
        const { handle } = new GetPlaceController();
        const { validate } = new GetPlaceValidator();

        router[method](path, validate, authenticate, handle);
    }
}
