import { SurveyCat } from './survey-cat';
import { SurveyQuest } from './survey-quest';
import { EmployeeEvaluation } from './employee-evaluation';

export interface Evaluation {
    Oid: string;
    companyOid: string;
    surveyTypeId: number;
    surveyBaseOid: string;
    surveyCatOid: string;
    statusEvaluationId: number;
    createdUser: string;
    dueTime: Date;
    createdAt: Date;
    survey?: SurveyCat | SurveyQuest;
    percentageFinished?: number;
    employeesNumber: number;
    EmployeeEvaluation?: EmployeeEvaluation;
}
