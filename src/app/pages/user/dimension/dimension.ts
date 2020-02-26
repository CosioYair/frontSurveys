import * as faker from 'faker';

export interface Dimension {
    Oid?: string;
    name: string;
    description?: string;
    companyOid?: string;
}

export function fakeDimension(): Dimension {
    const dimension: Dimension = {
        Oid: faker.random.uuid(),
        name: faker.random.word(),
        description: faker.random.word()
    };
    return dimension;
}
