import { Component, OnInit, Input } from '@angular/core';
import { BackError } from 'src/app/shared/model/backError';
import { Shared } from 'src/app/shared';

@Component({
  selector: 'app-back-error-list',
  templateUrl: './back-error-list.component.html',
  styleUrls: ['./back-error-list.component.scss']
})
export class BackErrorListComponent implements OnInit {

  public shared: Shared = new Shared();
  @Input() errors: BackError[];

  constructor() {
  }

  ngOnInit() {
  }

}
