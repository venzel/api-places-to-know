import { container } from 'tsyringe';

import '@modules/places/providers';

import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { PlaceMongoRepository } from '../infra/typeorm/mongo/repositories/PlaceMongoRepository';

container.registerSingleton<PlaceRepository>('PlaceRepository', PlaceMongoRepository);
