import { mocked } from 'ts-jest/utils';
import { mock } from 'jest-mock-extended';
import  Http from '../../common/http/Http';
import { User } from '../../models';
import { Repository, ConnectionManager } from 'typeorm'
import { usersData } from './User.service.test.data';

import { UserService } from './User.service';

const mockRepository = mock<Repository<User>>();
const mockEntityManager = mock<ConnectionManager>();

jest.mock('typeorm', () => { 
    return {
        BaseEntity: class Mock {},
        getRepository:() => mockRepository,
        getManager: jest.fn(),
        PrimaryGeneratedColumn: () => {},
        Column: () => {},
        OneToMany: () => {},
        ManyToOne: () => {},
        Entity: () => {},
        Index: () => {},
        JoinColumn: () => {},
    }
})

let userService: UserService;
beforeEach(() => {
    mockHttpGet.mockClear();
    userService = new UserService();
});

// HTTP Mock
const mockHttpGet = jest.fn((data) => {
    return Promise.resolve(data)
});

jest.mock('../../common/http/Http', () => {
    return jest.fn().mockImplementation(() => {
        return mockHttpGet
    })
});

describe('UserService -> downloadApiData', function () {
    test('should fetch users and return body of request', async function (done) {
        const mockedHttp = mocked(Http, true);
        expect(mockedHttp.mock.calls.length).toBe(1);

        expect(mockHttpGet.mock.calls.length).toBe(0);
        mockHttpGet.mockResolvedValue({
            body: JSON.parse(`[
                { "name": "Anne" },
                { "name": "Frank"  }
            ]`)
        });

        const users = await userService.downloadApiData()
        expect(mockHttpGet.mock.calls.length).toBe(1);

        expect(users).toEqual([ { name: "Anne" }, { name: "Frank" } ]);
        done();
    });
});

describe('UserService -> saveApiData', function () {
    test('should return just users that are locate on suites', async function () {
        // suggestion: use in memory db to store test input and instantiate connection with its configuration
        const rawUsersResponse = { body: JSON.stringify(usersData.withInvalidCase) };
        expect(mockHttpGet.mock.calls.length).toBe(0);

        mockHttpGet.mockResolvedValue(rawUsersResponse);

        jest.spyOn(userService, 'addUser').mockImplementation((usr: User) => {
            return Promise.resolve(usr);
        })

        const users = await userService.saveApiData()
        expect(mockHttpGet.mock.calls.length).toBe(1);

        expect(users).toEqual(usersData.withInvalidCaseExpect);
    })
})
