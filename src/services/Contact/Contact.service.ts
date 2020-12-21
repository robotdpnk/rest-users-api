import { getRepository, Repository, DeleteResult, DeepPartial, UpdateResult } from 'typeorm';
import { Contact } from '../../models';

import { EntityNotFoundException, ApiError } from '../../common/Errors/API/ApiErrors';

export class ContactService<Contact> {
    private readonly contactRepo: Repository<Contact>;

    constructor () {
        this.contactRepo = getRepository<Contact>(Contact);
    }

    public async getContact (id: string) : Promise<Contact | ApiError> {
        const foundContact = await this.contactRepo.findOne(id);

        if (foundContact) {
            return foundContact;
        } else {
            throw new EntityNotFoundException(id);
        }
    }

    public async getAllContacts () : Promise<Contact[]> {
        return await this.contactRepo.find();
    }

    public async addContact(body: Contact): Promise<Contact> {
        const contact = await this.contactRepo.create(body)
        return await this.contactRepo.save(contact);
    }

    public async updateContact(id: string, body: DeepPartial<Contact>): Promise<UpdateResult> {
        return await this.contactRepo.update(id, body);
    }

    public async deleteContact(id: string): Promise<DeleteResult> {
        return await this.contactRepo.delete(id);
    }
}