import { AuthUserMiddleware } from '@modules/users/middlewares/AuthUserMiddleware';
import { Router } from 'express';
import { ListPlacesController } from './ListPlacesController';

export class ListPlacesMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthUserMiddleware();
        const { handle } = new ListPlacesController();

        router[method](path, authenticate, handle);
    }
}
