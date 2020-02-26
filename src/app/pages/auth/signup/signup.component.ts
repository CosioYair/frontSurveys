import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackError } from 'src/app/shared/model/backError';
import { matchValidator } from 'src/app/shared/validators/match-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public form: FormGroup;
  public backErrors: BackError[] = [];

  constructor(public auhtService: AuthService,
    public router: Router) {
    this.form = new FormGroup({
      tagName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      matchPassword: new FormControl(null, [
        Validators.required,
        matchValidator('password')
      ])
    });
  }

  ngOnInit() {
  }

  signup() {
    const user = this.form.value;
    this.auhtService.signup(user.tagName, user.email, user.password, '3').pipe(
      take(1)
    ).subscribe(logged => {
      logged.then(userLogged => {
        this.router.navigate(['/user/profile']);
      });
    }, (err) => {
      this.backErrors = err.error;
    });
  }

}
