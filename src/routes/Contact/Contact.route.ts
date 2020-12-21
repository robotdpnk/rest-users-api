import { ContactService } from '../../services'
import { Path, PathParam, GET, POST, PATCH, DELETE, IgnoreNextMiddlewares } from 'typescript-rest';
import { ContactValidation } from '../../models';

import { ApiError } from '../../common/Errors/API/ApiErrors';

import { BaseRoute } from '../BaseRoute';
import { Contact } from '../../models';

@Path('/contact')
export class ContactRoute extends BaseRoute<Contact> {
    public name: string = 'contact';
    private readonly contactService: ContactService<Contact>;

    getName() { return this.name; }
    getSchema () { return ContactValidation; }

    constructor () {
        super();
        this.contactService = new ContactService();
    }

    @GET
    showContacts () {
        return this.contactService.getAllContacts();
    }

    @Path(":id")
    @GET
    getContact(@PathParam('id') id: string): Promise<Contact | ApiError> {
        return this.contactService.getContact(id);
    }

    @POST
    @IgnoreNextMiddlewares
    public async addContact(contact: Contact) {
        return await this.contactService.addContact(contact);
    }

    @Path(":id")
    @PATCH
    public async updateContact (@PathParam('id') id: string, entity: Contact) {
        console.log(id);
        const res = await this.contactService.updateContact(id, entity);
        console.log(res);
        
    }

    @Path(":id")
    @DELETE
    removeContact (@PathParam('id') id: string) {
        return this.contactService.deleteContact(id);
    }
}