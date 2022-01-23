import { HashProvider } from '../HashProvider';

class HashProviderInMemory implements HashProvider {
    async gererateHash(payload: string): Promise<string> {
        return payload;
    }

    async compareHash(payload: string, hashed: string): Promise<boolean> {
        return payload === hashed;
    }
}

export { HashProviderInMemory };
