import { User } from '@modules/users/schemas/User';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Transform, Exclude } from 'class-transformer';

@Entity('user')
export class UserMongoSchema implements User {
    @Transform((value) => {
        if ('value' in value) {
            return value.obj[value.key].toString();
        }

        return 'unknown value';
    })
    @ObjectIdColumn()
    public _id: ObjectID;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Exclude()
    @Column()
    public password: string;
}
