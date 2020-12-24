import { getManager, EntityManager, getRepository, Repository, DeleteResult, DeepPartial, UpdateResult } from 'typeorm';
import Http from '../../common/http/Http';
import { BaseService } from '../BaseService';
import { UserValidation } from '../../models/User/User.validation';

import { EntityNotFoundException, ApiError } from '../../common/Errors/API/ApiErrors';
import { ApiUser } from './User.service.types';
import { User, Address, Company, Contact } from '../../models';
import {  alphabeticOrderFn } from '../../common/util/util';

export class UserService extends BaseService<User> {
    private readonly repository: Repository<User>;
    private api: any;
    private manager: EntityManager;

    constructor () {
        super();

        this.repository = getRepository<User>(User);
        this.manager = getManager();
        this.api = new Http('https://jsonplaceholder.typicode.com/');
    }

    getSchema() {
        return UserValidation;
    }

    private transformApiToUser (rawUser: ApiUser): User {
        const transformedUser: any = {
            ...rawUser,
            address: {
                ...rawUser.address,
                lat: rawUser.address.geo.lat,
                lng: rawUser.address.geo.lng
            },
            contact: {
                phone: rawUser.phone,
                email: rawUser.email,
                website: rawUser.website
            }
        };

        delete transformedUser.id;
        delete transformedUser.address.geo;
        delete transformedUser.phone;
        delete transformedUser.website;
        delete transformedUser.email;

        return transformedUser;
    }

    public async getUser (id: string) : Promise<User | ApiError> {
        const foundUser = await this.repository.createQueryBuilder("User")
            .where({ id })
            .leftJoinAndSelect("User.address", 'uaddr')
            .getOne()

        if (foundUser) {
            return foundUser;
        } else {
            throw new EntityNotFoundException(id);
        }
    }

    public async downloadApiData (): Promise<JSON> {
        return await this.api('users')
            .then((response: Response) => response.body);
    }

    public async saveApiData (): Promise<User[]> {
        await this.repository.delete({});

        const rawUsers = await this.api('users')
            .then((response:Response) => response.body)
            .then(JSON.parse);

        const validationResult = await this.validateSchema(
            rawUsers, 
            this.transformApiToUser.bind(this), 
        );

        // @ts-ignore
        const { validUsers, invalidUsers } = validationResult
            .reduce((result: any , item: any) => {
                if (item.error) {
                    result.invalidUsers.push(item)
                    return result;
                }
                result.validUsers.push(item)
                return result;
            }, 
            { validUsers: [], invalidUsers: []})

        const suiteOrderedUsers = validUsers
            .sort(alphabeticOrderFn('name'))
            .filter(this.isSuiteUser);

        const savedUsersPromise = suiteOrderedUsers
            .map((validUser: User) => {
                return this.addUser(validUser);
            })

        return Promise.all(savedUsersPromise).then((savedUsers)=> {
            return [...invalidUsers, ...savedUsers];
        }).catch(err => err)
    }

    private isSuiteUser (user: User) {
        return /^[Ss]uite.{2,100}/.test(user.address.suite);
    }

    public async getAllUsers () : Promise<User[]> {
        return await this.repository.createQueryBuilder("User")
            .leftJoinAndSelect("User.address", "uaddress")
            .leftJoinAndSelect("User.contact", "ucontact")
            .leftJoinAndSelect("User.company", "ucompany")
            .getMany()
    }

    public async deleteAllApiData() {
        await this.manager.delete(Address, {});
        await this.manager.delete(Contact, {});
        await this.manager.delete(Company, {});
        await this.manager.delete(User, {});

        return Promise.resolve({ operation: 'Delete', result: 'OK' });
    }

    public async addUser(body: User): Promise<User> {
        const user = await this.repository.create(body)
        return await this.repository.save(user);
    }

    public async updateUser(id: string, body: DeepPartial<User>): Promise<UpdateResult> {
        return await this.repository.update(id, body);
    }

    public async deleteUser(id: string): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }
}