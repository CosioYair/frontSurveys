import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BackError } from 'src/app/shared/model/backError';
import { EditComponent } from '../components/edit/edit.component';
import { User } from 'src/app/shared/model/user';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { Dimension } from '../dimension';
import { DimensionService } from '../dimension.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  public dimension: Dimension = {} as Dimension;
  public validForm: boolean;
  public backErrors: BackError[] = [];
  public dimensionCreated: boolean = false;
  public user: User = {} as User;
  private _subscriptions: Subscription[] = [];

  @ViewChild('editComponent', { static: false }) editComponent: EditComponent;

  constructor(private _dimensionService: DimensionService, private _userService: UserService) { }

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

  dimensionUpdated(event): void {
    this.dimension = event.value;
    this.validForm = event.validForm;
  }

  create() {
    const newDimension: Dimension = {
      ...this.dimension,
      companyOid: this.user.companyOid
    };
    this._dimensionService.create(newDimension).subscribe(() => {
      this.editComponent.form.reset();
      this.dimensionCreated = true;
      this.backErrors = [];
    }, (err) => {
      this.dimensionCreated = true;
      this.backErrors = err.error;
    });
  }

}
