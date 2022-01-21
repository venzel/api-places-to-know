import { AuthUserMiddleware } from '@modules/users/middlewares/AuthUserMiddleware';
import { Router } from 'express';
import { DeletePlaceController } from './DeletePlaceController';
import { DeletePlaceValidator } from './DeletePlaceValidator';

export class DeletePlaceMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthUserMiddleware();
        const { validate } = new DeletePlaceValidator();
        const { handle } = new DeletePlaceController();

        router[method](path, authenticate, validate, handle);
    }
}
