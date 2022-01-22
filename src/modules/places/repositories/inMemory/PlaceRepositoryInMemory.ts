import { CreatePlaceDTO } from '@modules/places/dtos/CreatePlaceDTO';
import { FindPlaceDTO } from '@modules/places/dtos/FindPlaceDTO';
import { generateStringCombinatios } from '@modules/places/helpers/combStringHelper';
import { PlaceInMemory } from '@modules/places/schemas/inMemory/PlaceInMemory';
import { Place } from '@modules/places/schemas/Place';
import { normalizeString } from '@shared/helpers/normalizeStringHelper';
import { ObjectID } from 'mongodb';
import 'reflect-metadata';
import { PlaceRepository } from '../PlaceRepository';

export class PlaceRepositoryInMemory implements PlaceRepository {
    private repository: Place[];

    constructor() {
        this.repository = [];
    }

    async findOneById(id: string): Promise<Place | undefined> {
        return this.repository.find((place) => place._id === id);
    }

    async findOneBySlug(slug: string): Promise<Place | undefined> {
        return this.repository.find((place) => place.slug === slug);
    }

    async findSomeByFilter(findPlaceDTO: FindPlaceDTO): Promise<Place[]> {
        const { search } = findPlaceDTO;

        const places: Place[] = [];

        if (search) {
            const searchNormalized = normalizeString(search);

            this.repository.forEach((e) => {
                if (e.tags.includes(searchNormalized)) {
                    places.push(e);
                }
            });

            return places;
        }

        return this.repository;
    }

    async create(createPlaceDTO: CreatePlaceDTO): Promise<Place> {
        const place = new PlaceInMemory();

        place._id = new ObjectID();

        const { name } = createPlaceDTO;

        createPlaceDTO.slug = normalizeString(name);
        createPlaceDTO.tags = generateStringCombinatios(name);
        createPlaceDTO.photo = createPlaceDTO.slug;

        Object.assign(place, createPlaceDTO);

        this.repository.push(place);

        return place;
    }

    async save(place: Place): Promise<Place> {
        const index = this.repository.indexOf(place);

        if (index !== -1) {
            place.date_updated = new Date();

            this.repository[index] = place;
        }

        return place;
    }

    async list(): Promise<Place[]> {
        return this.repository;
    }

    async delete(place: Place): Promise<Place> {
        const index = this.repository.indexOf(place);

        if (index !== -1) {
            this.repository.splice(index, 1);
        }

        return place;
    }
}
