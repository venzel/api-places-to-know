import { Place } from '../Place';

export class PlaceInMemory implements Place {
    _id: any;
    name: string;
    slug: string;
    tags: string[];
    photo: string;
    date_created: Date;
    date_updated: Date;
}
