import { CreatePayloadDTO } from '@modules/users/dtos/CreatePayloadDTO';
import { PayloadDTO } from '@modules/users/dtos/PayloadDTO';
import { randomBytes } from 'crypto';
import { TokenProvider } from '../TokenProvider';

export class TokenProviderInMemory implements TokenProvider {
    async generateToken(data: CreatePayloadDTO): Promise<string> {
        return randomBytes(8).toString('hex');
    }

    validateToken(_: string): PayloadDTO {
        const id: string = randomBytes(2).toString('hex');

        return {
            user: {
                id,
                email: 'admin@admin.com',
            },
        };
    }
}
