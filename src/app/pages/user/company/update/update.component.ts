import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackError } from 'src/app/shared/model/backError';
import { User } from 'src/app/shared/model/user';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { CompanyService } from 'src/app/shared/services/company.service';
import { take } from 'rxjs/operators';
import { Company } from 'src/app/shared/model/company';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public backErrors: BackError[] = [];
  public companyUpdated: boolean = false;
  private _user: User = {} as User;
  private _subscriptions: Subscription[] = [];
  public registerCompleted: boolean;

  constructor(public userService: UserService,
    public companyService: CompanyService) {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      rfc: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/)
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.maxLength(10),
        Validators.minLength(10),
      ])
    });
  }

  ngOnInit() {
    this._subscriptions.push(
      this.userService.getUser.subscribe(user => {
        this._user = user;
        if (user.companyOid) {
          this.registerCompleted = true;
          this.getCompany();
        }
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getCompany() {
    this.companyService.show(this._user.companyOid).pipe(
      take(1)
    ).subscribe(company => {
      this.form.patchValue(company);
      this.backErrors = [];
    }, (err) => {
      this.backErrors = err.error;
    });
  }

  public setCompany() {
    const company: Company = { ...this.form.value } as Company;
    this._user.companyOid ? this.update(company) : this.create(company);
  }

  public create(company) {
    this.companyService.create(company).pipe(
      take(1)
    ).subscribe((companyUpdated) => {
      this.form.patchValue(companyUpdated);
      this.updateUserCompany(companyUpdated.Oid);
      this.companyUpdated = true;
      this.registerCompleted = true;
      this.backErrors = [];
    }, (err) => {
      this.companyUpdated = false;
      this.backErrors = err.error;
    });
  }

  public update(company: Company) {
    this.companyService.update(this._user.companyOid, company).pipe(
      take(1)
    ).subscribe((companyUpdated) => {
      this.form.patchValue(companyUpdated);
      this.companyUpdated = true;
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      this.backErrors = [];
    }, (err) => {
      this.companyUpdated = false;
      this.backErrors = err.error;
    });
  }

  public updateUserCompany(companyOid) {
    this._user = { ...this._user, companyOid };
    this.userService.update(this._user.Oid, this._user).pipe(
      take(1)
    ).subscribe((user) => {
      this.userService.setUser(user);
      this.backErrors = [];
    }, (err) => {
      this.companyUpdated = false;
      this.backErrors = err.error;
    });
  }
}
