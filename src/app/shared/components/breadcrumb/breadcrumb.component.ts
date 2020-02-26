import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';

import { filter } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  public breadcrumbs: any[] = [];
  public title: string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .subscribe(() => {
        let parentPath = '';
        const snapshot = this.router.routerState.snapshot;
        this.breadcrumbs = [];
        snapshot.url.split('/').forEach(path => {
          if (path.length > 0) {
            if (path.length === 36) {
              this.breadcrumbs[this.breadcrumbs.length - 1].path += `/${path}`;
            } else {
              parentPath += `/${path}`;
              this.breadcrumbs.push({
                path: parentPath,
                title: path
              });
            }
          }
        });
      });
  }

  ngOnInit() { }

  ngOnDestroy() { }

}
