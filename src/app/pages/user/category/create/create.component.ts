import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CategoryService } from '../category.service';
import { BackError } from 'src/app/shared/model/backError';
import { EditComponent } from '../components/edit/edit.component';
import { User } from 'src/app/shared/model/user';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { Category } from '../category';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  public category: Category = {} as Category;
  public validForm: boolean;
  public backErrors: BackError[] = [];
  public categoryCreated: boolean = false;
  public user: User = {} as User;
  private _subscriptions: Subscription[] = [];

  @ViewChild('editComponent', { static: false }) editComponent: EditComponent;

  constructor(private _categoryService: CategoryService, private _userService: UserService) { }

  ngOnInit() {
    this._subscriptions.push(
      this._userService.getUser.subscribe(user => {
        this.user = user;
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  categoryUpdated(event): void {
    this.category = event.value;
    this.validForm = event.validForm;
  }

  create() {
    const newCategory: Category = {
      ...this.category,
      companyOid: this.user.companyOid
    };
    this._categoryService.create(newCategory).subscribe(() => {
      this.editComponent.form.reset();
      this.categoryCreated = true;
      this.backErrors = [];
    }, (err) => {
      this.categoryCreated = false;
      this.backErrors = err.error;
    });
  }

}
