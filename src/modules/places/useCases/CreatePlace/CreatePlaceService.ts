import { CreatePlaceDTO } from '@modules/places/dtos/CreatePlaceDTO';
import { ResponsePlaceDTO } from '@modules/places/dtos/ReponsePlaceDTO';
import { getFirstUrlPhotoUnplash } from '@modules/places/helpers/apiUnplash';
import { generateTags } from '@modules/places/helpers/geralHelper';
import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { AppException } from '@shared/exceptions/AppException';
import { StatusCode } from '@shared/helpers/StatusCode';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreatePlaceService {
    constructor(@inject('PlaceRepository') private classRepository: PlaceRepository) {}

    async execute(createPlaceDTO: CreatePlaceDTO): Promise<ResponsePlaceDTO> {
        const { name } = createPlaceDTO;

        const existsSchema = await this.classRepository.findOneByName(name);

        if (existsSchema) {
            throw new AppException(`Place name ${name} already exists!`, StatusCode.CONFLICT);
        }

        const photo = await getFirstUrlPhotoUnplash(name);

        const tags = generateTags(name);

        Object.assign(createPlaceDTO, { photo, tags });

        const schemaCreated = await this.classRepository.create(createPlaceDTO);

        return schemaCreated;
    }
}
