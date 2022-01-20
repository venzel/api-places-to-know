import { User } from '../schemas/User';

export interface ResponseUserTokenDTO {
    token: string;
    user: {
        _id: string;
        name: string;
    };
}
