import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { matchValidator } from 'src/app/shared/validators/match-validator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackError } from 'src/app/shared/model/backError';
import { Router } from '@angular/router';
import { ActionService } from 'src/app/shared/services/action.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public emailForm: FormGroup;
  public passwordForm: FormGroup;
  public backErrors: BackError[] = [];
  public tokenSent: boolean = false;
  public passwordReset: boolean = false;

  constructor(public actionService: ActionService,
    public router: Router) {
    this.emailForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ])
    });
    this.passwordForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      matchPassword: new FormControl(null, [
        Validators.required,
        matchValidator('password')
      ]),
      token: new FormControl(null, [
        Validators.required,
      ])
    });
  }

  ngOnInit() {
  }

  public newToken() {
    const user = this.emailForm.value;
    this.actionService.newActionByUserEmail(user.email, 3).subscribe(() => {
      this.backErrors = [];
      this.tokenSent = true;
    }, (err) => {
      this.backErrors = err.error;
    });
  }

  public setNewPassword() {
    const user = this.passwordForm.value;
    this.actionService.confirmToken(user.token, { password: user.password }).subscribe(() => {
      this.backErrors = [];
      this.passwordReset = true;
    }, (err) => {
      this.backErrors = err.error;
    });
  }

}
