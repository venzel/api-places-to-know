import { CreatePlaceDTO } from '@modules/places/dtos/CreatePlaceDTO';
import { PlaceInMemory } from '@modules/places/schemas/inMemory/PlaceInMemory';
import { Place } from '@modules/places/schemas/Place';
import 'reflect-metadata';
import { v4 as uuid } from 'uuid';
import { PlaceRepository } from '../PlaceRepository';

export class PlaceRepositoryInMemory implements PlaceRepository {
    private repository: Place[];

    constructor() {
        this.repository = [];
    }

    async findSomeByTerm(term: string): Promise<Place[]> {
        throw new Error('Method not implemented.');
    }

    async findOneById(id: string): Promise<Place | undefined> {
        return this.repository.find((place) => place._id === id);
    }

    async findOneByName(name: string): Promise<Place | undefined> {
        return this.repository.find((place) => place.name === name);
    }

    async create(createPlaceDTO: CreatePlaceDTO): Promise<Place> {
        const place = new PlaceInMemory();

        place._id = uuid();

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
