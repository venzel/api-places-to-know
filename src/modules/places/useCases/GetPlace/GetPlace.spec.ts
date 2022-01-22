import { PlaceRepositoryInMemory } from '@modules/places/repositories/inMemory/PlaceRepositoryInMemory';
import { GetPlaceService } from './GetPlaceService';
import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { AppException } from '@shared/exceptions/AppException';

let placeRepository: PlaceRepository;
let getPlaceService: GetPlaceService;

describe('GetPlaceService', () => {
    beforeEach(() => {
        placeRepository = new PlaceRepositoryInMemory();
        getPlaceService = new GetPlaceService(placeRepository);
    });

    // TEST 1

    it('should be get a place', async () => {
        const placeCreated = await placeRepository.create({
            name: 'Gato',
        });

        const placeGet = await getPlaceService.execute(placeCreated._id);

        expect(placeGet).toHaveProperty('_id');
    });

    // TEST 2

    it('should be not get a place', async () => {
        const idToFailGenerate = '61e7b0d3df858ff94da412ca';

        await expect(getPlaceService.execute(idToFailGenerate)).rejects.toBeInstanceOf(AppException);
    });
});
