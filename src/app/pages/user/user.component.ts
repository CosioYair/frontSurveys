import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DecodedJwt } from 'src/app/shared/model/decoded-jwt';
import { User } from 'src/app/shared/model/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import * as feather from 'feather-icons';
import { NavService } from 'src/app/shared/services/nav.service';
import { CustomizerService } from 'src/app/shared/services/customizer.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce, zoomOut, zoomIn, fadeIn, bounceIn } from 'ng-animate';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('animateRoute', [transition('* => *', useAnimation(fadeIn, {
      // Set the duration to 5seconds and delay to 2 seconds
      //params: { timing: 3}
    }))])
  ]
})
export class UserComponent implements OnInit {

  public sideNavOpened: boolean = false;
  public decodedJwt$: Observable<DecodedJwt>;
  public user$: Observable<User>;
  public right_side_bar: boolean;

  constructor(public authService: AuthService,
    public router: Router,
    public userService: UserService,
    public navServices: NavService,
    public customizer: CustomizerService
  ) {
    this.decodedJwt$ = this.authService.getDecodedJwt;
    this.user$ = this.userService.getUser;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      feather.replace();
    });
  }

  public login() {
    this.sideNavOpened = false;
    this.router.navigate(['/user/auth']);
  }

  public logout() {
    this.sideNavOpened = false;
    this.authService.logout();
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  public rightSidebar($event) {
    this.right_side_bar = $event
  }

}
