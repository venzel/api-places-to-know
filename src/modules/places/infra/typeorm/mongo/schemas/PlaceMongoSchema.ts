import { Place } from '@modules/places/schemas/Place';
import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from 'typeorm';
import { Transform, Exclude } from 'class-transformer';

@Entity('place')
export class PlaceMongoSchema implements Place {
    @Transform((value) => {
        if ('value' in value) {
            return value.obj[value.key].toString();
        }

        return 'unknown value';
    })
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Exclude()
    @Column()
    slug: string;

    @Exclude()
    @Column({ array: true })
    tags: string[];

    @Column()
    photo: string;

    @CreateDateColumn()
    date_created: Date;

    @UpdateDateColumn()
    date_updated: Date;
}
