import { token_expires, token_secret } from '@configs/token';
import { CreatePayloadDTO } from '@modules/users/dtos/CreatePayloadDTO';
import { PayloadDTO } from '@modules/users/dtos/PayloadDTO';
import { AppException } from '@shared/exceptions/AppException';
import { StatusCode } from '@shared/helpers/StatusCode';
import { sign, verify } from 'jsonwebtoken';
import { TokenProvider } from '../models/TokenProvider';

class JWTTokenProvider implements TokenProvider {
    async generateToken(createPayloadDTO: CreatePayloadDTO): Promise<string> {
        const { id, email } = createPayloadDTO;

        try {
            const payload: PayloadDTO = {
                user: {
                    id,
                    email,
                },
            };

            return sign(payload, token_secret, { expiresIn: token_expires });
        } catch {
            throw new Error('Token not generated!');
        }
    }

    validateToken(token: string): PayloadDTO {
        try {
            const decoded: object | string = verify(token, token_secret);

            const { user } = decoded as PayloadDTO;

            return { user };
        } catch {
            throw new AppException('Token expired or invalid!', StatusCode.FORBIDDEN);
        }
    }
}

export { JWTTokenProvider };
