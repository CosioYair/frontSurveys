import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  public notFound: boolean = false;
  public searchText: string;
  public searchUsers: any[] = [];

  constructor() {
  }

  ngOnInit() { }

  searchTerm(searchText) {
    return searchText;
  }

}
