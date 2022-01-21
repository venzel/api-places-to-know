import { ResponsePlaceDTO } from '@modules/places/dtos/ReponsePlaceDTO';
import { normalizeString } from '@modules/places/helpers/normalizeStringHelper';
import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindPlacesService {
    constructor(@inject('PlaceRepository') private placeRepository: PlaceRepository) {}

    async execute(term: string): Promise<ResponsePlaceDTO[]> {
        const stringNormalized = normalizeString(term.toLowerCase());

        return await this.placeRepository.findSomeByTerm(stringNormalized);
    }
}
