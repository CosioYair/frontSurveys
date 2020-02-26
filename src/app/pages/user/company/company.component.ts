import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {

  public screenSize: string = '';
  private _subscriptions: Subscription[] = [];

  constructor(public mediaObserver: MediaObserver) {
    // tslint:disable-next-line: deprecation
    this._subscriptions.push(
      mediaObserver.media$.subscribe((change: MediaChange) => {
        this.screenSize = change.mqAlias;
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
