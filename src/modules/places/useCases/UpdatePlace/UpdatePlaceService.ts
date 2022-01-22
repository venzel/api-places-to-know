import { ResponsePlaceDTO } from '@modules/places/dtos/ReponsePlaceDTO';
import { UpdatePlaceDTO } from '@modules/places/dtos/UpdatePlaceDTO';
import { possibleCombinations } from '@modules/places/helpers/combStringHelper';
import { PhotoStockProvider } from '@modules/places/providers/PhotoStock/PhotoStockProvider';
import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { AppException } from '@shared/exceptions/AppException';
import { StatusCode } from '@shared/helpers/StatusCode';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdatePlaceService {
    constructor(
        @inject('PlaceRepository') private placeRepository: PlaceRepository,
        @inject('PhotoStockProvider') private photoStockProvider: PhotoStockProvider
    ) {}

    async execute(updatePlaceDTO: UpdatePlaceDTO): Promise<ResponsePlaceDTO> {
        const { id, name } = updatePlaceDTO;

        const existsSchema = await this.placeRepository.findOneById(id);

        if (!existsSchema) {
            throw new AppException(`Place id ${id} not found!`, StatusCode.NOT_FOUND);
        }

        if (existsSchema.name !== name) {
            updatePlaceDTO.photo = await this.photoStockProvider.getUrlPhoto(name);

            updatePlaceDTO.tags = possibleCombinations(name);
        }

        Object.assign(existsSchema, updatePlaceDTO);

        const schemaSaved = await this.placeRepository.save(existsSchema);

        return schemaSaved;
    }
}
