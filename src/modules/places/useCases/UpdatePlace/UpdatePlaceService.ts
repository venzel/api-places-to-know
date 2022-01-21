import { ResponsePlaceDTO } from '@modules/places/dtos/ReponsePlaceDTO';
import { UpdatePlaceDTO } from '@modules/places/dtos/UpdatePlaceDTO';
import { getFirstUrlPhotoUnplash } from '@modules/places/helpers/apiUnplashHelper';
import { possibleCombinations } from '@modules/places/helpers/combStringHelper';
import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { AppException } from '@shared/exceptions/AppException';
import { StatusCode } from '@shared/helpers/StatusCode';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdatePlaceService {
    constructor(@inject('PlaceRepository') private placeRepository: PlaceRepository) {}

    async execute(updatePlaceDTO: UpdatePlaceDTO, id: string): Promise<ResponsePlaceDTO> {
        const { name } = updatePlaceDTO;

        const existsSchema = await this.placeRepository.findOneById(id);

        if (!existsSchema) {
            throw new AppException(`Place id ${id} not found!`, StatusCode.NOT_FOUND);
        }

        if (existsSchema.name !== name) {
            updatePlaceDTO.photo = await getFirstUrlPhotoUnplash(name);

            updatePlaceDTO.tags = possibleCombinations(name);
        }

        Object.assign(existsSchema, updatePlaceDTO);

        const schemaSaved = await this.placeRepository.save(existsSchema);

        return schemaSaved;
    }
}
