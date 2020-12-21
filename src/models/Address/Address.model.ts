import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne } from "typeorm";
import { User } from "../User/User.model";

@Entity('Address')
@Index("city_street_suite_index", ['city', 'street', 'suite'], { unique: true}) // need to name to get compose index
export class Address {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    street: string;

    @Column({ length: 100 })
    suite: string;

    @Column({ length: 100 })
    city: string;

    @Column({ length: 100 })
    zipcode: string;

    @Column('float')
    lat: number;

    @Column('float')
    lng: number;

    user: User[];
}