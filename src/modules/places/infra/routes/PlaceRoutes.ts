import { CreatePlaceMiddleware } from '@modules/places/useCases/CreatePlace/CreatePlaceMiddleware';
import { DeletePlaceMiddleware } from '@modules/places/useCases/DeletePlace/DeletePlaceMiddleware';
import { FindPlacesMiddleware } from '@modules/places/useCases/FindPlaces/FindPlacesMiddleware';
import { GetPlaceMiddleware } from '@modules/places/useCases/GetPlace/GetPlaceMiddleware';
import { UpdatePlaceMiddleware } from '@modules/places/useCases/UpdatePlace/UpdatePlaceMiddleware';
import { Router } from 'express';

export class PlaceRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreatePlaceMiddleware().register(router, 'post', '/places');

        // Get
        new GetPlaceMiddleware().register(router, 'get', '/places/:id');

        // Find
        new FindPlacesMiddleware().register(router, 'get', '/places');

        // Delete
        new DeletePlaceMiddleware().register(router, 'delete', '/places/:id');

        // Update
        new UpdatePlaceMiddleware().register(router, 'put', '/places/:id');
    }
}
