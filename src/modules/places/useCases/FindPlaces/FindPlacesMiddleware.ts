import { AuthUserMiddleware } from '@modules/users/middlewares/AuthUserMiddleware';
import { Router } from 'express';
import { FindPlacesController } from './FindPlacesController';

export class FindPlacesMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthUserMiddleware();
        const { handle } = new FindPlacesController();

        router[method](path, authenticate, handle);
    }
}
