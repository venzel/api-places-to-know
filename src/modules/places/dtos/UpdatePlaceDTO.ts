import { IsNotEmpty } from 'class-validator';
import { CreatePlaceDTO } from './CreatePlaceDTO';

export class UpdatePlaceDTO extends CreatePlaceDTO {
    @IsNotEmpty({ message: 'Name not empty!' })
    id: string;

    constructor(id: string, name: string) {
        super(name);

        this.id = id;
    }

    static update(id: string, name: string) {
        return new UpdatePlaceDTO(id, name);
    }
}
