import { CreatePlaceDTO } from '@modules/places/dtos/CreatePlaceDTO';
import { Place } from '@modules/places/schemas/Place';
import { FindPlaceDTO } from '../dtos/FindPlaceDTO';

export interface PlaceRepository {
    findOneById(id: string): Promise<Place | undefined>;

    findOneBySlug(slug: string): Promise<Place | undefined>;

    findSomeByFilter(findPlaceDTO: FindPlaceDTO): Promise<Place[]>;

    create(createPlaceDTO: CreatePlaceDTO): Promise<Place>;

    save(Placee: Place): Promise<Place>;

    list(): Promise<Place[]>;

    delete(Placee: Place): Promise<Place>;
}
