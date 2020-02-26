import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { fakeCategory, Category } from '../category';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryComponentsModule } from '../components/category-components.module';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../category.service';
import { EditComponent } from '../components/edit/edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserService } from 'src/app/shared/services/user.service';
import { MockUserService } from 'src/app/shared/services/user.service.mock';
import { MockCategoryService, ERROR } from '../category.service.mock';
import { throwError } from 'rxjs';

fdescribe('CreateComponent', () => {
  let component: CreateComponent;
  let editComponent: EditComponent;
  let categoryService: CategoryService;
  let userService: UserService;
  let fixture: ComponentFixture<CreateComponent>;
  const mockCategory: Category = fakeCategory();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        CategoryComponentsModule,
        HttpClientModule,
        SharedModule
      ],
      providers: [
        { provide: CategoryService, useValue: MockCategoryService },
        { provide: UserService, useValue: MockUserService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    editComponent = fixture.debugElement.query(By.directive(EditComponent)).componentInstance;
    categoryService = TestBed.get(CategoryService);
    userService = TestBed.get(UserService);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get user from userService', () => {
      expect(component.user.Oid).toBeDefined();
    });
  });

  it('should update category values when the editComponent emits a change', () => {
    const categoryUpdatedFn = spyOn(component, 'categoryUpdated').and.callThrough();
    editComponent.form.patchValue({ name: mockCategory.name });
    expect(categoryUpdatedFn).toHaveBeenCalledWith({
      value: {
        name: mockCategory.name,
        description: null
      },
      validForm: false
    });
    expect(component.category).toEqual({ name: mockCategory.name, description: null });
  });

  it('updateCategory should update category and validForm values', () => {
    const event = {
      value: { name: mockCategory.name, description: mockCategory.description },
      validForm: true
    };
    component.categoryUpdated(event);
    expect(component.category).toEqual({ name: mockCategory.name, description: mockCategory.description });
    expect(component.validForm).toBeTruthy();
  });

  describe('create', () => {
    it('should create a new category successfully', () => {
      component.category.name = mockCategory.name;
      component.category.description = mockCategory.description;
      const newCategory: Category = {
        ...component.category,
        companyOid: component.user.companyOid
      };
      const resetFormFn = spyOn(editComponent.form, 'reset');
      const createFn = spyOn(categoryService, 'create').and.callThrough();
      component.create();
      expect(createFn).toHaveBeenCalledWith(newCategory);
      expect(component.backErrors.length).toEqual(0);
      expect(component.categoryCreated).toBeTruthy();
      expect(resetFormFn).toHaveBeenCalled();
    });

    it('should throw an error on create category', () => {
      component.category.name = mockCategory.name;
      component.category.description = mockCategory.description;
      const newCategory = {
        ...component.category,
        companyOid: component.user.companyOid
      };
      const createFn = spyOn(categoryService, 'create').and.returnValue(throwError(ERROR));
      component.create();
      expect(createFn).toHaveBeenCalled();
      expect(component.categoryCreated).toBeFalsy();
      expect(component.backErrors.length).toBeGreaterThan(0);
    });
  });
});
