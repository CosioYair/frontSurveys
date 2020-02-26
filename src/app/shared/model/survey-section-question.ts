export interface SurveySectionQuestion {
    Oid?: string;
    surveySection?: string;
    questionOid: string;
    categoryOid?: string;
    domainOid?: string;
    dimensionOid?: string;
    order?: number;
}
