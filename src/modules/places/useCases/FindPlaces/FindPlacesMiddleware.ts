import { AuthUserMiddleware } from '@modules/users/middlewares/AuthUserMiddleware';
import { Router } from 'express';
import { FindPlacesController } from './FindPlacesController';
import { FindPlaceValidator } from './FindPlaceValidator';

export class FindPlacesMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthUserMiddleware();
        const { validate } = new FindPlaceValidator();
        const { handle } = new FindPlacesController();

        router[method](path, authenticate, validate, handle);
    }
}
