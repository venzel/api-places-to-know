import { IsNotEmpty } from 'class-validator';

export class CreatePlaceDTO {
    @IsNotEmpty({ message: 'Name not empty!' })
    name: string;

    @IsNotEmpty({ message: 'Description not empty!' })
    photo: string;

    constructor(name: string, photo: string) {
        this.name = name;
        this.photo = photo;
    }

    static create(name: string, photo: string) {
        return new CreatePlaceDTO(name, photo);
    }
}
