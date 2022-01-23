import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePlaceDTO {
    @IsNotEmpty({ message: 'Name not empty!' })
    name: string;

    @IsOptional()
    slug?: string;

    @IsOptional()
    tags?: string[];

    @IsOptional()
    photo?: string;

    constructor(name: string) {
        this.name = name;
    }

    static create(name: string) {
        return new CreatePlaceDTO(name);
    }
}
