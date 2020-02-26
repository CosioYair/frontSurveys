import { User, fakeUser } from "../model/user";
import { Observable, of } from 'rxjs';

export const USER_OBJECT: User = fakeUser();

export const MockUserService = {
    get getUser(): Observable<User> {
        return of(USER_OBJECT);
    }
};

