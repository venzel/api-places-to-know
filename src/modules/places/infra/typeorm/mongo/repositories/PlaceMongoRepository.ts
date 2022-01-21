import { CreatePlaceDTO } from '@modules/places/dtos/CreatePlaceDTO';
import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { Place } from '@modules/places/schemas/Place';
import { ObjectID } from 'mongodb';
import { getMongoRepository, MongoRepository, Like } from 'typeorm';
import { PlaceMongoSchema } from '../schemas/PlaceMongoSchema';

export class PlaceMongoRepository implements PlaceRepository {
    private repository: MongoRepository<Place>;

    constructor() {
        this.repository = getMongoRepository(PlaceMongoSchema, 'mongodb');
    }

    async findSomeByTerm(term: string): Promise<Place[]> {
        return await this.repository.find({
            where: {
                tags: { $in: [term] },
            },
        });
    }

    async findOneById(id: string): Promise<Place | undefined> {
        return await this.repository.findOne({ _id: new ObjectID(id) });
    }

    async findOneByName(name: string): Promise<Place | undefined> {
        return await this.repository.findOne({ name });
    }

    async create(createPlaceDTO: CreatePlaceDTO): Promise<Place> {
        const schemaCreated = this.repository.create(createPlaceDTO);

        await this.repository.save(schemaCreated);

        return schemaCreated;
    }

    async save(place: Place): Promise<Place> {
        place.date_updated = new Date();

        await this.repository.save(place);

        return place;
    }

    async list(): Promise<Place[]> {
        return await this.repository.find();
    }

    async delete(place: Place): Promise<Place> {
        await this.repository.delete(place);

        return place;
    }
}
