import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-box-message',
  templateUrl: './box-message.component.html',
  styleUrls: ['./box-message.component.scss']
})
export class BoxMessageComponent implements OnInit {

  @Input() messages;
  @Input() boxClass;

  constructor() { }

  ngOnInit() {
  }

}
