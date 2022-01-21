import { AuthUserMiddleware } from '@modules/users/middlewares/AuthUserMiddleware';
import { Router } from 'express';
import { ShowPlaceController } from './ShowPlaceController';

export class ShowPlaceMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthUserMiddleware();
        const { handle } = new ShowPlaceController();

        router[method](path, authenticate, handle);
    }
}
