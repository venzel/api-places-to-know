import { CreatePlaceDTO } from '@modules/places/dtos/CreatePlaceDTO';
import { FindPlaceDTO } from '@modules/places/dtos/FindPlaceDTO';
import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { Place } from '@modules/places/schemas/Place';
import { ObjectID } from 'mongodb';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { PlaceMongoSchema } from '../schemas/PlaceMongoSchema';

export class PlaceMongoRepository implements PlaceRepository {
    private repository: MongoRepository<Place>;

    constructor() {
        this.repository = getMongoRepository(PlaceMongoSchema, 'mongodb');
    }

    async findSomeByFilter(findPlaceDTO: FindPlaceDTO): Promise<Place[]> {
        let { page, limit, search, order: order_ } = findPlaceDTO;

        page = !page || page < 1 ? 1 : page;
        limit = !limit ? 5 : limit;

        const where = {};
        const order = {};

        if (search !== 'undefined') {
            Object.assign(where, { tags: { $in: [search] } });
        }

        const orders: any = {
            name: { name: 'ASC' },
            slug: { slug: 'ASC' },
        };

        const existsProperty = orders.hasOwnProperty(order_);

        if (order_ !== 'undefined' && existsProperty) {
            Object.assign(order, orders[order_]);
        }

        return await this.repository.find({
            where,
            order,
            take: limit,
            skip: (page - 1) * limit,
        });
    }

    async findOneById(id: string): Promise<Place | undefined> {
        return await this.repository.findOne({ _id: new ObjectID(id) });
    }

    async findOneBySlug(slug: string): Promise<Place | undefined> {
        return await this.repository.findOne({ slug });
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
