import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../User/User.model";

@Entity('Contact')
export class Contact {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    phone: string;

    @Column({ length: 100 })
    email: string;

    @Column({ length: 100 })
    website: string;

    user: User[];
}