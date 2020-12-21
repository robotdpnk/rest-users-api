import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../User/User.model";

@Entity('Company')
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 200 })
    catchPhrase: string;

    @Column({ length: 100 })
    bs: string;

    user: User[];
}