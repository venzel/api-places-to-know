import { PlaceRepositoryInMemory } from '@modules/places/repositories/inMemory/PlaceRepositoryInMemory';
import { UpdatePlaceService } from './UpdatePlaceService';
import { PhotoStockProvider } from '@modules/places/providers/PhotoStock/PhotoStockProvider';
import { PhotoStockProviderInMemory } from '@modules/places/providers/PhotoStock/inMemory/PhotoStockProviderInMemory';
import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { AppException } from '@shared/exceptions/AppException';

let placeRepository: PlaceRepository;
let photoStockProvider: PhotoStockProvider;
let updatePlaceService: UpdatePlaceService;

describe('UpdatePlaceService', () => {
    beforeEach(() => {
        placeRepository = new PlaceRepositoryInMemory();
        photoStockProvider = new PhotoStockProviderInMemory();
        updatePlaceService = new UpdatePlaceService(placeRepository, photoStockProvider);
    });

    // TEST 1

    it('should be update a place', async () => {
        const placeCreated = await placeRepository.create({
            name: 'Gato',
        });

        const getUrlPhoto = jest.spyOn(photoStockProvider, 'getUrlPhoto');

        const placeUpated = await updatePlaceService.execute({
            id: placeCreated._id,
            name: 'cachorro',
        });

        expect(getUrlPhoto).toHaveBeenCalledWith('cachorro');

        expect(placeUpated).toHaveProperty('_id');

        expect(placeUpated.name).toBe('cachorro');
    });

    // // TEST 2

    it('should be not update a place', async () => {
        const idToFailGenerate = '61e7b0d3df858ff94da412ca';

        await expect(
            updatePlaceService.execute({
                id: idToFailGenerate,
                name: 'cachorro',
            })
        ).rejects.toBeInstanceOf(AppException);
    });
});
