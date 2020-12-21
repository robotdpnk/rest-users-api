import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, BaseEntity, ManyToOne } from "typeorm";
import { Address } from "../Address/Address.model";
import { Company } from "../Company/Company.model";
import { Contact } from "../Contact/Contact.model";

@Entity('User')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 100, /* unique: true */ })
    username: string;

    @ManyToOne(() => Address, address => address.user, { cascade: true })
    @JoinColumn()
    address: Address;

    @ManyToOne(() => Company, { cascade: true }) 
    @JoinColumn()
    company: Company

    @ManyToOne(() => Contact, contact => contact.user, { cascade: true })
    @JoinColumn()
    contact: Contact
}