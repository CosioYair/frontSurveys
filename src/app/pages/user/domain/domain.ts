import * as faker from 'faker';

export interface Domain {
    Oid?: string;
    name: string;
    description?: string;
    companyOid?: string;
}

export function fakeDomain(): Domain {
    const domain: Domain = {
        Oid: faker.random.uuid(),
        name: faker.random.word(),
        description: faker.random.word()
    };
    return domain;
}
