import { Observable, of, throwError } from 'rxjs';
import { BackError } from 'src/app/shared/model/backError';
import { fakeDomain, Domain } from './domain';

const CATEGORY_OBJECT: Domain = fakeDomain();
const ERROR: Observable<BackError[]> = throwError([{ Code: 399, Message: 'Algo salio mal' } as BackError]);

export const MockDomainService = {
    create(category: Domain, error = false): Observable<Domain> | Observable<BackError[]> {
        return error ? ERROR : of({ ...CATEGORY_OBJECT, ...category });
    }
};

