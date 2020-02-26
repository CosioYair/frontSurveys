import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CategoryService } from './category.service';
import { fakeCategory, Category } from './category';
import { environment } from 'src/environments/environment';

describe('CategoryService', () => {
  let service: CategoryService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  const mockResponse: Category = fakeCategory();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new category', () => {
    service.create(mockResponse).subscribe((category: Category) => {
      expect(category).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${environment.api}/categories`);
    expect(req.request.method).toBe('POST');
    req.flush({ Category: mockResponse });
  });

  it('should show a category', () => {
    service.show(mockResponse.Oid).subscribe((category: Category) => {
      expect(category).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${environment.api}/categories/${mockResponse.Oid}`);
    expect(req.request.method).toBe('GET');
    req.flush({ Category: mockResponse });
  });

  it('should update a category', () => {
    service.update(mockResponse.Oid, mockResponse).subscribe((category: Category) => {
      expect(category).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${environment.api}/categories/${mockResponse.Oid}`);
    expect(req.request.method).toBe('PUT');
    req.flush({ Category: mockResponse });
  });

  it('should delete a category', () => {
    service.delete(mockResponse.Oid).subscribe((category: Category) => {
      expect(category).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${environment.api}/categories/${mockResponse.Oid}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ Category: mockResponse });
  });
});
