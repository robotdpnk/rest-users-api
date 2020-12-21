import { AddressService } from '../../services'
import { Path, PathParam, GET, POST, PATCH, DELETE, IgnoreNextMiddlewares } from 'typescript-rest';
import { AddressValidation } from '../../models/Address/Address.validation';

import { ApiError } from '../../common/Errors/API/ApiErrors';

import { BaseRoute } from '../BaseRoute';
import { Address } from '../../models';

@Path('/address')
export class AddressRoute extends BaseRoute<Address> {
    public name: string = 'address';
    private readonly addressService: AddressService<Address>;

    getName() { return this.name; }
    getSchema () { return AddressValidation; }

    constructor () {
        super();
        this.addressService = new AddressService();
    }

    @GET
    showAddresss () {
        return this.addressService.getAllAddresss();
    }

    @Path(":id")
    @GET
    getAddress(@PathParam('id') id: string): Promise<Address | ApiError> {
        return this.addressService.getAddress(id);
    }

    @POST
    @IgnoreNextMiddlewares
    public async addAddress(address: Address) {
        return await this.addressService.addAddress(address);
    }

    @Path(":id")
    @PATCH
    public async updateAddress (@PathParam('id') id: string, entity: Address) {
        console.log(id);
        const res = await this.addressService.updateAddress(id, entity);
        console.log(res);
        
    }

    @Path(":id")
    @DELETE
    removeAddress (@PathParam('id') id: string) {
        return this.addressService.deleteAddress(id);
    }
}