import { CompanyService } from '../../services'
import { Path, PathParam, GET, POST, PATCH, DELETE, IgnoreNextMiddlewares } from 'typescript-rest';
import { CompanyValidation } from '../../models/Company/Company.validation';

import { ApiError } from '../../common/Errors/API/ApiErrors';

import { BaseRoute } from '../BaseRoute';
import { Company } from '../../models';

@Path('/company')
export class CompanyRoute extends BaseRoute<Company> {
    public name: string = 'company';
    private readonly companyService: CompanyService<Company>;

    getName() { return this.name; }
    getSchema () { return CompanyValidation; }

    constructor () {
        super();
        this.companyService = new CompanyService();
    }

    @GET
    showCompanys () {
        return this.companyService.getAllCompanys();
    }

    @Path(":id")
    @GET
    getCompany(@PathParam('id') id: string): Promise<Company | ApiError> {
        return this.companyService.getCompany(id);
    }

    @POST
    @IgnoreNextMiddlewares
    public async addCompany(company: Company) {
        return await this.companyService.addCompany(company);
    }

    @Path(":id")
    @PATCH
    public async updateCompany (@PathParam('id') id: string, entity: Company) {
        console.log(id);
        const res = await this.companyService.updateCompany(id, entity);
        console.log(res);
        
    }

    @Path(":id")
    @DELETE
    removeCompany (@PathParam('id') id: string) {
        return this.companyService.deleteCompany(id);
    }
}