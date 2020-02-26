import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { BackError } from 'src/app/shared/model/backError';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public backErrors: BackError[] = [];

  constructor(public auhtService: AuthService,
    public router: Router) {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  ngOnInit() {
  }

  login() {
    const user = this.form.value;
    this.auhtService.login(user.email, user.password).pipe(
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
