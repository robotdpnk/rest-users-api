import { User, Address, Company } from '../../models';

export type ApiUser = 
    User & {
        address: Omit<Address, "lat"|"lng"> & GeoObj
    } & {
        company: Company
    } & {
        phone: string,
        email: string,
        website: string
    }

type GeoObj = { geo: { lat: number, lng: number } };