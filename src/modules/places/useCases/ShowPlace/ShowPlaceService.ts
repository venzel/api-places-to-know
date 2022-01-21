import { ResponsePlaceDTO } from '@modules/places/dtos/ReponsePlaceDTO';
import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { AppException } from '@shared/exceptions/AppException';
import { StatusCode } from '@shared/helpers/StatusCode';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ShowPlaceService {
    constructor(@inject('PlaceRepository') private placeRepository: PlaceRepository) {}

    async execute(id: string): Promise<ResponsePlaceDTO> {
        const existsSchema = await this.placeRepository.findOneById(id);

        if (!existsSchema) {
            throw new AppException(`Place id ${id} not found!`, StatusCode.NOT_FOUND);
        }

        return existsSchema;
    }
}
