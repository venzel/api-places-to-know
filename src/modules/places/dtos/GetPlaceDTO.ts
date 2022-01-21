import { IsNotEmpty, IsMongoId } from 'class-validator';

export class GetPlaceDTO {
    @IsNotEmpty({ message: 'id not empty!' })
    @IsMongoId()
    id: string;

    constructor(id: string) {
        this.id = id;
    }

    static create(id: string) {
        return new GetPlaceDTO(id);
    }
}
