import { CreatePlaceDTO } from '@modules/places/dtos/CreatePlaceDTO';
import { ResponsePlaceDTO } from '@modules/places/dtos/ReponsePlaceDTO';
import { getFirstUrlPhotoUnplash } from '@modules/places/helpers/apiUnplashHelper';
import { possibleCombinations } from '@modules/places/helpers/combStringHelper';
import { normalizeString } from '@modules/places/helpers/normalizeStringHelper';
import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { AppException } from '@shared/exceptions/AppException';
import { StatusCode } from '@shared/helpers/StatusCode';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreatePlaceService {
    constructor(@inject('PlaceRepository') private classRepository: PlaceRepository) {}

    async execute(createPlaceDTO: CreatePlaceDTO): Promise<ResponsePlaceDTO> {
        const { name } = createPlaceDTO;

        const slug = normalizeString(name);

        const existsSchema = await this.classRepository.findOneBySlug(slug);

        if (existsSchema) {
            throw new AppException(`Place name ${name} already exists!`, StatusCode.CONFLICT);
        }

        const tags = possibleCombinations(name);

        const photo = await getFirstUrlPhotoUnplash(name);

        Object.assign(createPlaceDTO, { slug, tags, photo });

        const schemaCreated = await this.classRepository.create(createPlaceDTO);

        return schemaCreated;
    }
}
