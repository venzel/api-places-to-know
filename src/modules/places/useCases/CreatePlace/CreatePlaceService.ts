import { CreatePlaceDTO } from '@modules/places/dtos/CreatePlaceDTO';
import { ResponsePlaceDTO } from '@modules/places/dtos/ReponsePlaceDTO';
import { generateStringCombinatios } from '@modules/places/helpers/combStringHelper';
import { PhotoStockProvider } from '@modules/places/providers/PhotoStock/PhotoStockProvider';
import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { AppException } from '@shared/exceptions/AppException';
import { normalizeString } from '@shared/helpers/normalizeStringHelper';
import { StatusCode } from '@shared/helpers/StatusCode';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreatePlaceService {
    constructor(
        @inject('PlaceRepository') private classRepository: PlaceRepository,
        @inject('PhotoStockProvider') private photoStockProvider: PhotoStockProvider
    ) {}

    async execute(createPlaceDTO: CreatePlaceDTO): Promise<ResponsePlaceDTO> {
        const { name } = createPlaceDTO;

        const slug = normalizeString(name);

        const existsSchema = await this.classRepository.findOneBySlug(slug);

        if (existsSchema) {
            throw new AppException(`Place name ${name} already exists!`, StatusCode.CONFLICT);
        }

        const tags = generateStringCombinatios(name);

        const photo = await this.photoStockProvider.getUrlPhoto(name);

        Object.assign(createPlaceDTO, { slug, tags, photo });

        const schemaCreated = await this.classRepository.create(createPlaceDTO);

        return schemaCreated;
    }
}
