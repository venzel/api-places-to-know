import { compare, hash } from 'bcryptjs';
import { HashProvider } from '../HashProvider';

export class BcryptHashProvider implements HashProvider {
    async gererateHash(payload: string): Promise<string> {
        return await hash(payload, 10);
    }

    async compareHash(payload: string, hashed: string): Promise<boolean> {
        return await compare(payload, hashed);
    }
}
