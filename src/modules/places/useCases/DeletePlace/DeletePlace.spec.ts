import { PlaceRepositoryInMemory } from '@modules/places/repositories/inMemory/PlaceRepositoryInMemory';
import { DeletePlaceService } from './DeletePlaceService';
import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { AppException } from '@shared/exceptions/AppException';

let placeRepository: PlaceRepository;
let deletePlaceService: DeletePlaceService;

describe('DeletePlaceService', () => {
    beforeEach(() => {
        placeRepository = new PlaceRepositoryInMemory();
        deletePlaceService = new DeletePlaceService(placeRepository);
    });

    // TEST 1

    it('should be delete a place', async () => {
        const placeCreated = await placeRepository.create({
            name: 'Paris',
        });

        const placeDeleted = await deletePlaceService.execute(placeCreated._id);

        expect(placeDeleted).toHaveProperty('_id');
    });

    // TEST 2

    it('should be not delete a place', async () => {
        const idToFailGenerate = '61e7b0d3df858ff94da412ca';

        await expect(deletePlaceService.execute(idToFailGenerate)).rejects.toBeInstanceOf(AppException);
    });
});
