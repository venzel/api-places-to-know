import 'dotenv/config';
import { PlaceMongoRepository } from '@modules/places/infra/typeorm/mongo/repositories/PlaceMongoRepository';
import { UnPlashProvider } from '@modules/places/providers/PhotoStock/implements/UnPlashProvider';
import { CreatePlaceService } from '@modules/places/useCases/CreatePlace/CreatePlaceService';
import { UserMongoRepository } from '@modules/users/infra/typeorm/mongo/repositories/UserMongoRepository';
import { BcryptHashProvider } from '@modules/users/providers/HashProvider/implements/BcryptHashProvider';
import { JWTTokenProvider } from '@modules/users/providers/TokenProvider/implements/JWTTokenProvider';
import { RegisterUserService } from '@modules/users/useCases/RegisterUser/RegisterUserService';
import { connectService } from '../../';
import { places } from '../../data/places';
import { users } from '../../data/users';

const userContext = async () => {
    const userRepository = new UserMongoRepository();
    const hashProvider = new BcryptHashProvider();
    const tokenProvider = new JWTTokenProvider();
    const registerUserService = new RegisterUserService(userRepository, hashProvider, tokenProvider);

    for (const user of users) {
        await registerUserService.execute(user);
    }
};

const placeContext = async () => {
    const placeRepository = new PlaceMongoRepository();
    const photoStokProvider = new UnPlashProvider();
    const createPlaceService = new CreatePlaceService(placeRepository, photoStokProvider);

    for (const place of places) {
        await createPlaceService.execute(place);
    }
};

const main = async () => {
    const connection = await connectService('mongodb');

    await userContext();

    await placeContext();

    connection.close();
};

main()
    .then((e) => {
        console.log(`Finalized!`);
    })
    .catch((e) => {
        console.log(`Error in create seed!`);
        console.log(e);
    });
