import * as faker from 'faker';
import { SurveySectionQuestion } from 'src/app/shared/model/survey-section-question';

export interface Question {
    Oid?: string;
    title: string;
    answerTypeId?: number;
    companyOid?: string;
    answerTypeTitle?: string;
    SurveySectionQuestion?: SurveySectionQuestion;
}

export function fakeQuestion(): Question {
    const question: Question = {
        Oid: faker.random.uuid(),
        title: `${faker.random.phrase()}?`,
        answerTypeId: faker.random.number()
    };
    return question;
}
