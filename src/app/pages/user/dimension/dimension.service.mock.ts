import { Observable, of, throwError } from 'rxjs';
import { BackError } from 'src/app/shared/model/backError';
import { fakeDimension, Dimension } from './dimension';

const CATEGORY_OBJECT: Dimension = fakeDimension();
const ERROR: Observable<BackError[]> = throwError([{ Code: 399, Message: 'Algo salio mal' } as BackError]);

export const MockDimensionService = {
    create(category: Dimension, error = false): Observable<Dimension> | Observable<BackError[]> {
        return error ? ERROR : of({ ...CATEGORY_OBJECT, ...category });
    }
};

