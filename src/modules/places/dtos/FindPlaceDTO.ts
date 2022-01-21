import { IsOptional, MaxLength } from 'class-validator';

export class FindPlaceDTO {
    @IsOptional()
    @MaxLength(12, { message: 'Nome áximo de 12 caractares!' })
    name?: string;

    constructor(name: string) {
        this.name = name;
    }

    static create(name: string) {
        return new this(name);
    }
}
