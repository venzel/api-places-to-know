import 'reflect-metadata';
import { CreatePlaceDTO } from '@modules/places/dtos/CreatePlaceDTO';
import { FindPlaceDTO } from '@modules/places/dtos/FindPlaceDTO';
import { generateStringCombinatios } from '@modules/places/helpers/combStringHelper';
import { PlaceInMemory } from '@modules/places/schemas/inMemory/PlaceInMemory';
import { Place } from '@modules/places/schemas/Place';
import { normalizeString } from '@shared/helpers/normalizeStringHelper';
import { ObjectID } from 'mongodb';
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
        const { search, limit, order } = findPlaceDTO;

        let places: Place[] = this.repository;

        if (search) {
            places = [];

            const searchNormalized = normalizeString(search);

            this.repository.forEach((e) => {
                if (e.tags.includes(searchNormalized)) {
                    places.push(e);
                }
            });
        }

        if (limit) {
            places = places.slice(0, limit);
        }

        if (order) {
            const compare = (placeA: Place, placeB: Place): number => {
                const a = placeA.slug.toLowerCase();
                const b = placeB.slug.toLowerCase();

                return a === b ? 0 : a > b ? 1 : -1;
            };

            places.sort(compare);
        }

        return places;
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

    async deleteAll(): Promise<any> {
        this.repository = [];
    }
}
