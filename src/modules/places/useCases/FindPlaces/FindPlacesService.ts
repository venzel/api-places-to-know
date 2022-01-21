import { FindPlaceDTO } from '@modules/places/dtos/FindPlaceDTO';
import { ResponsePlaceDTO } from '@modules/places/dtos/ReponsePlaceDTO';
import { normalizeString } from '@modules/places/helpers/normalizeStringHelper';
import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindPlacesService {
    constructor(@inject('PlaceRepository') private placeRepository: PlaceRepository) {}

    async execute(findPlaceDTO: FindPlaceDTO): Promise<ResponsePlaceDTO[]> {
        const { name } = findPlaceDTO;

        if (name) {
            findPlaceDTO.name = normalizeString(name.toLowerCase());
        }

        return await this.placeRepository.findSomeByFilter(findPlaceDTO);
    }
}
