import { AuthUserMiddleware } from '@modules/users/middlewares/AuthUserMiddleware';
import { Router } from 'express';
import { UpdatePlaceController } from './UpdatePlaceController';
import { UpdatePlaceValidator } from './UpdatePlaceValidator';

export class UpdatePlaceMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { validate } = new UpdatePlaceValidator();
        const { authenticate } = new AuthUserMiddleware();
        const { handle } = new UpdatePlaceController();

        router[method](path, validate, authenticate, handle);
    }
}
