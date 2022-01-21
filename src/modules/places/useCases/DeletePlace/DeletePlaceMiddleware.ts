import { AuthUserMiddleware } from '@modules/users/middlewares/AuthUserMiddleware';
import { Router } from 'express';
import { DeletePlaceController } from './DeletePlaceController';

export class DeletePlaceMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthUserMiddleware();
        const { handle } = new DeletePlaceController();

        router[method](path, authenticate, handle);
    }
}
