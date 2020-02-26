import * as faker from 'faker';

export interface User {
    Oid?: string;
    tagName: string;
    email: string;
    companyOid?: string;
}

export function fakeUser(): User {
    const user: User = {
        Oid: faker.random.uuid(),
        tagName: faker.name.findName(),
        email: faker.internet.email(),
        companyOid: faker.random.uuid()
    };
    return user;
}

