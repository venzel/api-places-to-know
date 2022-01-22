import { PlaceRepositoryInMemory } from '@modules/places/repositories/inMemory/PlaceRepositoryInMemory';
import { CreatePlaceService } from './CreatePlaceService';
import { PhotoStockProvider } from '@modules/places/providers/PhotoStock/PhotoStockProvider';
import { PhotoStockProviderInMemory } from '@modules/places/providers/PhotoStock/inMemory/PhotoStockProviderInMemory';
import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { AppException } from '@shared/exceptions/AppException';

let placeRepository: PlaceRepository;
let photoStockProvider: PhotoStockProvider;
let createPlaceService: CreatePlaceService;

describe('CreatePlaceService', () => {
    beforeEach(() => {
        placeRepository = new PlaceRepositoryInMemory();
        photoStockProvider = new PhotoStockProviderInMemory();
        createPlaceService = new CreatePlaceService(placeRepository, photoStockProvider);
    });

    // TEST 1

    it('should be create a new place', async () => {
        const getUrlPhoto = jest.spyOn(photoStockProvider, 'getUrlPhoto');

        const placeCreated = await createPlaceService.execute({
            name: 'elefante',
        });

        expect(getUrlPhoto).toHaveBeenCalledWith('elefante');

        expect(placeCreated).toHaveProperty('_id');
    });

    // TEST 2

    it('should be not create a new place', async () => {
        createPlaceService = new CreatePlaceService(placeRepository, photoStockProvider);

        const nameToFailGenerate = 'tigre';

        await createPlaceService.execute({ name: nameToFailGenerate });

        await expect(
            createPlaceService.execute({
                name: nameToFailGenerate,
            })
        ).rejects.toBeInstanceOf(AppException);
    });
});
