import { Place } from '@modules/places/schemas/Place';
import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

@Entity('place')
export class PlaceMongoSchema implements Place {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column({ array: true })
    tags: string[];

    @Column()
    photo: string;

    @CreateDateColumn()
    date_created: Date;

    @UpdateDateColumn()
    date_updated: Date;
}
