import { IsOptional, MaxLength } from 'class-validator';
import { FindBasePlaceDTO } from './FindBasePlaceDTO';

export class FindPlaceDTO extends FindBasePlaceDTO {
    @IsOptional()
    @MaxLength(20, { message: 'Search: máximo de 20 caractares!' })
    search?: string;

    constructor(page: number, limit: number, search: string, order: string) {
        super(page, limit, order);

        this.search = search;
    }

    static create(page: number, limit: number, search: string, order: string) {
        return new this(page, limit, search, order);
    }
}
