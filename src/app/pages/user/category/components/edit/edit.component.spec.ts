import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { Category, fakeCategory } from '../../category';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  const mockCategory: Category = fakeCategory();
  let nativeComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeComponent = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input category', () => {
    it('should be an empty category object', () => {
      expect(component.category).toEqual({} as Category);
    });

    it('should be a category object', () => {
      component.category = mockCategory;
      fixture.detectChanges();
      expect(component.category).toBeTruthy(mockCategory);
    });
  });

  describe('Category form', () => {
    let form;
    beforeEach(() => {
      form = component.form;
    });

    it('should be composes of category fields', () => {
      expect(form.controls.name).toBeTruthy();
      expect(form.controls.description).toBeTruthy();
    });

    it('should be render the caetegory fields', () => {
      const nameInput = fixture.debugElement.query(By.css('input[formcontrolname="name"]'));
      const descriptionInput = fixture.debugElement.query(By.css('input[formcontrolname="description"]'));
      expect(nameInput).toBeTruthy();
      expect(descriptionInput).toBeTruthy();
    });

    it('should test form validity', () => {
      expect(form.valid).toBeFalsy();
      form.patchValue(mockCategory);
      expect(form.valid).toBeTruthy();
    });

    it('should emit the updated category when the form values change with falsy form', () => {
      component.categoryUpdated.subscribe(value => {
        expect(value).toEqual({
          value: {
            name: mockCategory.name,
            description: null
          },
          validForm: false
        });
      });
      form.controls.name.setValue(mockCategory.name);
    });

    it('should emit the updated category when the form values change with truthy form', () => {
      component.categoryUpdated.subscribe(value => {
        expect(value).toEqual({
          value: {
            name: mockCategory.name,
            description: mockCategory.description
          },
          validForm: true
        });
      });
      form.patchValue(mockCategory);
    });
  });
});
