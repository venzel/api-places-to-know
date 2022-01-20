import { CreatePlaceDTO } from '@modules/places/dtos/CreatePlaceDTO';
import { Place } from '@modules/places/schemas/Place';

export interface PlaceRepository {
    findOneById(id: string): Promise<Place | undefined>;

    findOneByName(name: string): Promise<Place | undefined>;

    create(createPlaceDTO: CreatePlaceDTO): Promise<Place>;

    save(Placee: Place): Promise<Place>;

    list(): Promise<Place[]>;

    delete(Placee: Place): Promise<Place>;
}
