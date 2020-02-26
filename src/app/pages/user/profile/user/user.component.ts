import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackError } from 'src/app/shared/model/backError';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public backErrors: BackError[] = [];
  private _user: User = {} as User;
  public userUpdated: boolean = false;
  private _subscriptions: Subscription[] = [];

  constructor(public userService: UserService) {
    this.form = new FormGroup({
      tagName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ])
    });
  }

  ngOnInit() {
    this._subscriptions.push(
      this.userService.getUser.subscribe(user => {
        this._user = user;
        this.form.patchValue(user);
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public update() {
    const user: User = { ...this.form.value } as User;
    this.userService.update(this._user.Oid, user).pipe(
      take(1)
    ).subscribe(userUpdated => {
      this.userService.setUser(userUpdated);
      this.userUpdated = true;
      this.backErrors = [];
    }, (err) => {
      this.userUpdated = false;
      this.backErrors = err.error;
    });
  }

}
