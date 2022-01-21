import { CreatePlaceMiddleware } from '@modules/places/useCases/CreatePlace/CreatePlaceMiddleware';
import { DeletePlaceMiddleware } from '@modules/places/useCases/DeletePlace/DeletePlaceMiddleware';
import { ListPlacesMiddleware } from '@modules/places/useCases/ListPlaces/ListPlacesMiddleware';
import { FindPlacesMiddleware } from '@modules/places/useCases/FindPlaces/FindPlacesMiddleware';
import { UpdatePlaceMiddleware } from '@modules/places/useCases/UpdatePlace/UpdatePlaceMiddleware';
import { Router } from 'express';

export class PlaceRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreatePlaceMiddleware().register(router, 'post', '/places');

        // List
        // new ListPlacesMiddleware().register(router, 'get', '/places');

        // Find
        new FindPlacesMiddleware().register(router, 'get', '/places');

        // Delete
        new DeletePlaceMiddleware().register(router, 'delete', '/places/:id');

        // Update
        new UpdatePlaceMiddleware().register(router, 'put', '/places/:id');
    }
}
