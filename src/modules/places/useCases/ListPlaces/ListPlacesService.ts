import { ReponseListPlacesDTO } from '@modules/places/dtos/ReponseListPlacesDTO';
import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListPlacesService {
    constructor(@inject('PlaceRepository') private placeRepository: PlaceRepository) {}

    async execute(): Promise<ReponseListPlacesDTO> {
        return await this.placeRepository.list();
    }
}
