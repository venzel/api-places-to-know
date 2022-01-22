import { IsInt, IsOptional, MaxLength } from 'class-validator';

export class FindBasePlaceDTO {
    @IsOptional()
    @IsInt({ message: 'Page: apenas números!' })
    page?: number;

    @IsOptional()
    @IsInt({ message: 'Limit: apenas números!' })
    limit?: number;

    @IsOptional()
    @MaxLength(20, { message: 'Order: máximo de 20 caractares!' })
    order?: string;

    constructor(page: number, limit: number, order: string) {
        this.page = page;
        this.limit = limit;
        this.order = order;
    }
}
