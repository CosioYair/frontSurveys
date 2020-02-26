import { Observable, of, throwError } from 'rxjs';
import { Category, fakeCategory } from './category';
import { BackError } from 'src/app/shared/model/backError';

const CATEGORY_OBJECT: Category = fakeCategory();
export const ERROR = { error: [{ Code: 399, Message: 'Algo salio mal' }] };

export const MockCategoryService = {
    create(category: Category): Observable<Category> {
        return of({ ...CATEGORY_OBJECT, ...category });
    }
};

