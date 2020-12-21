import { getRepository, Repository, DeleteResult, DeepPartial, UpdateResult } from 'typeorm';
import { Address } from '../../models';

import { EntityNotFoundException, ApiError } from '../../common/Errors/API/ApiErrors';

export class AddressService<Address> {
    private readonly addressRepo: Repository<Address>;

    constructor () {
        this.addressRepo = getRepository<Address>(Address);
    }

    public async getAddress (id: string) : Promise<Address | ApiError> {
        const foundAddress = await this.addressRepo.findOne(id)

        if (foundAddress) {
            return foundAddress;
        } else {
            throw new EntityNotFoundException(id);
        }
    }

    public async getAllAddresss () : Promise<Address[]> {
        return await this.addressRepo.find();
    }


    public async addAddress(body: Address): Promise<Address> {
        const address = await this.addressRepo.create(body)
        return await this.addressRepo.save(address);
    }

    public async updateAddress(id: string, body: DeepPartial<Address>): Promise<UpdateResult> {
        return await this.addressRepo.update(id, body);
    }

    public async deleteAddress(id: string): Promise<DeleteResult> {
        return await this.addressRepo.delete(id);
    }
}