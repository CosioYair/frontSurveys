import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BackError } from 'src/app/shared/model/backError';
import { EditComponent } from '../components/edit/edit.component';
import { User } from 'src/app/shared/model/user';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { Domain } from '../domain';
import { DomainService } from '../domain.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  public domain: Domain = {} as Domain;
  public validForm: boolean;
  public backErrors: BackError[] = [];
  public domainCreated: boolean = false;
  public user: User = {} as User;
  private _subscriptions: Subscription[] = [];

  @ViewChild('editComponent', { static: false }) editComponent: EditComponent;

  constructor(private _domainService: DomainService, private _userService: UserService) { }

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

  domainUpdated(event): void {
    this.domain = event.value;
    this.validForm = event.validForm;
  }

  create() {
    const newDomain: Domain = {
      ...this.domain,
      companyOid: this.user.companyOid
    };
    this._domainService.create(newDomain).subscribe(() => {
      this.editComponent.form.reset();
      this.domainCreated = true;
      this.backErrors = [];
    }, (err) => {
      this.domainCreated = true;
      this.backErrors = err.error;
    });
  }

}
