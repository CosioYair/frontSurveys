import * as faker from 'faker';
import { Question } from '../question/question';
import { SurveySectionQuestion } from 'src/app/shared/model/survey-section-question';

export interface SurveySection {
    Oid?: string;
    title: string;
    companyOid?: string;
    Questions?: SurveySectionQuestion[];
}

export function fakeSurveySection(): SurveySection {
    const surveySection: SurveySection = {
        Oid: faker.random.uuid(),
        title: `${faker.random.phrase()}`
    };
    return surveySection;
}
