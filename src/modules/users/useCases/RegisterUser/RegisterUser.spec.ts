import { HashProviderInMemory } from '@modules/users/providers/HashProvider/inMemory/HashProviderInMemory';
import { HashProvider } from '@modules/users/providers/HashProvider/HashProvider';
import { TokenProviderInMemory } from '@modules/users/providers/TokenProvider/inMemory/TokenProviderInMemory';
import { TokenProvider } from '@modules/users/providers/TokenProvider/TokenProvider';
import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory';
import { UserRepository } from '@modules/users/repositories/UserRepository';
import { AppException } from '@shared/exceptions/AppException';
import { RegisterUserService } from './RegisterUserService';

let userRepository: UserRepository;
let hashProvider: HashProvider;
let tokenProvider: TokenProvider;
let registerUserService: RegisterUserService;

describe('RegisterUserService', () => {
    beforeEach(() => {
        userRepository = new UserRepositoryInMemory();
        hashProvider = new HashProviderInMemory();
        tokenProvider = new TokenProviderInMemory();
        registerUserService = new RegisterUserService(userRepository, hashProvider, tokenProvider);
    });

    // TEST 1

    it('should be register a new user', async () => {
        const generateHash = jest.spyOn(hashProvider, 'gererateHash');

        const user = await registerUserService.execute({
            name: 'tiago',
            email: 'tiago@gmail.com',
            password: 'penadepato',
        });

        expect(user).toHaveProperty('_id');
        expect(generateHash).toHaveBeenCalledWith('penadepato');
    });

    // TEST 2

    it('should be not register a new user', async () => {
        registerUserService = new RegisterUserService(userRepository, hashProvider, tokenProvider);

        const emailToFailGenerate = 'tiago@gmail.com';

        await registerUserService.execute({
            name: 'tiago',
            email: emailToFailGenerate,
            password: 'P3nadetubarao',
        });

        await expect(
            registerUserService.execute({
                name: 'tiago',
                email: emailToFailGenerate,
                password: 'P3nadetubarao',
            })
        ).rejects.toBeInstanceOf(AppException);
    });
});
