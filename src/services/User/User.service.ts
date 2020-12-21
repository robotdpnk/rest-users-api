import { getRepository, Repository, DeleteResult, DeepPartial, UpdateResult } from 'typeorm';
import { User } from '../../models';

import { EntityNotFoundException, ApiError } from '../../common/Errors/API/ApiErrors';

export class UserService<User> {
    private readonly userRepo: Repository<User>;

    constructor () {
        this.userRepo = getRepository<User>(User);
    }

    public async getUser (id: string) : Promise<User | ApiError> {
        const foundUser = await this.userRepo.createQueryBuilder("User")
            .where({ id })
            .leftJoinAndSelect("User.address", 'uaddr')
            .getOne()

        if (foundUser) {
            return foundUser;
        } else {
            throw new EntityNotFoundException(id);
        }
    }

    public async getAllUsers () : Promise<User[]> {
        return await this.userRepo.find();
    }


    public async addUser(body: User): Promise<User> {
        const user = await this.userRepo.create(body)
        return await this.userRepo.save(user);
    }

    public async updateUser(id: string, body: DeepPartial<User>): Promise<UpdateResult> {
        return await this.userRepo.update(id, body);
    }

    public async deleteUser(id: string): Promise<DeleteResult> {
        return await this.userRepo.delete(id);
    }
}