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

    it('should be find a all places without a filter', async () => {
        const places = ['Brazil', 'Argentina', 'Londres', 'EUA'];

        for (const name of places) {
            await placeRepository.create({
                name,
            });
        }

        const result = await findPlacesService.execute({});

        expect(result.length).toBe(4);
    });

    // TEST 2

    it('should be find a place only with search', async () => {
        const places = ['Brazil', 'Argentina', 'Londres', 'EUA'];

        for (const name of places) {
            await placeRepository.create({
                name,
            });
        }

        const nameToOkSearch = 'BRA';

        const findPlace = {
            search: nameToOkSearch,
        };

        const result = await findPlacesService.execute(findPlace);

        const firstResult = result[0];

        expect(firstResult).toHaveProperty('_id');

        expect(firstResult.slug).toBe('brazil');
    });

    // TEST 3

    it('should be find a place with limit', async () => {
        const places = ['Brazil', 'Argentina', 'Londres', 'EUA'];

        for (const name of places) {
            await placeRepository.create({
                name,
            });
        }

        const nameToOkSearch = 'a';
        const limitToOkSearch = 2;

        const findPlace = {
            search: nameToOkSearch,
            limit: limitToOkSearch,
        };

        const result = await findPlacesService.execute(findPlace);

        expect(result.length).toBe(2);
    });

    // TEST 4

    it('should be find a place with order', async () => {
        const places = ['Brazil', 'Argentina', 'Londres', 'EUA'];

        for (const name of places) {
            await placeRepository.create({
                name,
            });
        }

        const nameToOkSearch = 'a';
        const limitToOkSearch = 2;
        const orderToOkSearch = 'name';

        const findPlace = {
            search: nameToOkSearch,
            limit: limitToOkSearch,
            order: orderToOkSearch,
        };

        const result = await findPlacesService.execute(findPlace);

        const firstResult = result[0];

        expect(firstResult.slug).toBe('argentina');
    });
});
