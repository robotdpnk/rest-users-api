import { getManager, EntityManager, getRepository, Repository, DeleteResult, DeepPartial, UpdateResult } from 'typeorm';
import { GotHttp as Http } from '../../common/http/GotHttp';
import { BaseService } from '../BaseService';
import { UserValidation } from '../../models/User/User.validation';

import { EntityNotFoundException, ApiError } from '../../common/Errors/API/ApiErrors';
import { ApiUser } from './User.service.types';
import { User, Address, Company, Contact } from '../../models';

export class UserService extends BaseService<User> {
    private readonly repository: Repository<User>;
    private api: any;
    private eapi: any;
    private manager: EntityManager;

    constructor () {
        super();

        this.repository = getRepository<User>(User);
        this.manager = getManager();
        this.api = new Http('http://localhost:3000/api')
        this.eapi = new Http('http://localhost:3000/error-api')
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

    /**
     * Realiza download e api/users
     */
    public async downloadApiData (): Promise<JSON> {
        return this.api('users')
            .then((response: Response) => response.body)
            // .then(JSON.parse);
    }

    public async saveApiData (): Promise<any> {
        this.repository.delete({});

        const rawUsers = await this.eapi.get('users')
            .then((response:Response) => response.body)
            .then(JSON.parse);

        return await this.validateSchema(
            rawUsers, 
            this.transformApiToUser.bind(this), 
            (user) => this.addUser(user) // test
            );
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