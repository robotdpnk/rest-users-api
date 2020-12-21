import { getRepository, Repository, DeleteResult, DeepPartial, UpdateResult } from 'typeorm';
import { Company } from '../../models';

import { EntityNotFoundException, ApiError } from '../../common/Errors/API/ApiErrors';

export class CompanyService<Company> {
    private readonly companyRepo: Repository<Company>;

    constructor () {
        this.companyRepo = getRepository<Company>(Company);
    }

    public async getCompany (id: string) : Promise<Company | ApiError> {
        const foundCompany = await this.companyRepo.findOne(id);

        if (foundCompany) {
            return foundCompany;
        } else {
            throw new EntityNotFoundException(id);
        }
    }

    public async getAllCompanys () : Promise<Company[]> {
        return await this.companyRepo.find();
    }

    public async addCompany(body: Company): Promise<Company> {
        const company = await this.companyRepo.create(body)
        return await this.companyRepo.save(company);
    }

    public async updateCompany(id: string, body: DeepPartial<Company>): Promise<UpdateResult> {
        return await this.companyRepo.update(id, body);
    }

    public async deleteCompany(id: string): Promise<DeleteResult> {
        return await this.companyRepo.delete(id);
    }
}