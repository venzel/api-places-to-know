import { PlaceRepositoryInMemory } from '@modules/places/repositories/inMemory/PlaceRepositoryInMemory';
import { FindPlacesService } from './FindPlacesService';
import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';

let placeRepository: PlaceRepository;
let findPlacesService: FindPlacesService;

describe('FindPlacesService', () => {
    beforeEach(() => {
        placeRepository = new PlaceRepositoryInMemory();
        findPlacesService = new FindPlacesService(placeRepository);
    });

    // TEST 1

    it('should be find a place', async () => {
        const places = ['Brazil', 'Argentina', 'Londres', 'EUA'];

        for (const name of places) {
            await placeRepository.create({
                name,
            });
        }

        const nameToOkSearch = 'BRA';

        const findPlace = {
            search: nameToOkSearch,
            order: 'name',
        };

        const result = await findPlacesService.execute(findPlace);

        const firstResult = result[0];

        // expect(firstResult).toHaveProperty('_id');

        expect(firstResult.slug).toBe('brazil');
    });
});
