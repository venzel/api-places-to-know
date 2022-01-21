import { CreatePlaceMiddleware } from '@modules/places/useCases/CreatePlace/CreatePlaceMiddleware';
import { DeletePlaceMiddleware } from '@modules/places/useCases/DeletePlace/DeletePlaceMiddleware';
import { ListPlacesMiddleware } from '@modules/places/useCases/ListPlaces/ListPlacesMiddleware';
import { ShowPlaceMiddleware } from '@modules/places/useCases/ShowPlace/ShowPlaceMiddleware';
import { UpdatePlaceMiddleware } from '@modules/places/useCases/UpdatePlace/UpdatePlaceMiddleware';
import { Router } from 'express';

export class PlaceRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreatePlaceMiddleware().register(router, 'post', '/places');

        // List
        new ListPlacesMiddleware().register(router, 'get', '/places');

        // Show
        new ShowPlaceMiddleware().register(router, 'get', '/places/:id');

        // Delete
        new DeletePlaceMiddleware().register(router, 'delete', '/places/:id');

        // Update
        new UpdatePlaceMiddleware().register(router, 'put', '/places/:id');
    }
}
