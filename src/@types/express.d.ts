interface AuthDTO {
    id: string;
    email: string;
}

declare namespace Express {
    export interface Request {
        auth: AuthDTO;
    }
}
