import { UserService } from '../../services'
import { Path, PathParam, GET, POST, PATCH, DELETE, IgnoreNextMiddlewares } from 'typescript-rest';
import { UserValidation } from '../../models/User/User.validation';

import { ApiError } from '../../common/Errors/API/ApiErrors';

import { BaseRoute } from '../BaseRoute';
import { User } from '../../models';

@Path('/user')
export class UserRoute extends BaseRoute<User> {
    public name: string = 'user';
    private readonly userService: UserService;

    getName() { return this.name; }
    getSchema () { return UserValidation; }

    constructor () {
        super();
        this.userService = new UserService();
    }

    @GET
    showUsers () {
        return this.userService.getAllUsers();
    }

    /**
     * Realiza download de api/users e responde a cliente
     * @returns {string} Contem reposta JSON formadata
     */
    @Path('/download')
    @GET
    @IgnoreNextMiddlewares
    async downloadApiData (): Promise<JSON> {
        return await this.userService.downloadApiData();
    }

    @Path('/save')
    @GET
    @IgnoreNextMiddlewares
    saveApiData (): Promise<{ success: User[], error: any[] }> {
        return this.userService.saveApiData();
    }

    @Path('/delete_all')
    @GET
    @IgnoreNextMiddlewares
    deleteAllApiData (): Promise<any> {
        return this.userService.deleteAllApiData();
    }

    @Path(":id")
    @GET
    getUser(@PathParam('id') id: string): Promise<User | ApiError> {
        return this.userService.getUser(id);
    }

    @POST
    @IgnoreNextMiddlewares
    public async addUser(user: User) {
        return await this.userService.addUser(user);
    }

    @Path(":id")
    @PATCH
    public async updateUser (@PathParam('id') id: string, entity: User) {
        console.log(id);
        const res = await this.userService.updateUser(id, entity);
        console.log(res);
        
    }

    @Path(":id")
    @DELETE
    removeUser (@PathParam('id') id: string) {
        return this.userService.deleteUser(id);
    }
}