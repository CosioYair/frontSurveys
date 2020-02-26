import * as faker from 'faker';

export interface Category {
    Oid?: string;
    name: string;
    description?: string;
    companyOid?: string;
}

export function fakeCategory(): Category {
    const category: Category = {
        Oid: faker.random.uuid(),
        name: faker.random.word(),
        description: faker.random.word()
    };
    return category;
}
