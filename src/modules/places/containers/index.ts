import { container } from 'tsyringe';

import { PlaceRepository } from '@modules/places/repositories/PlaceRepository';
import { PlaceMongoRepository } from '../infra/typeorm/mongo/repositories/PlaceMongoRepository';

container.registerSingleton<PlaceRepository>('PlaceRepository', PlaceMongoRepository);
