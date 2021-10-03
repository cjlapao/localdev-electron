import {
  Component,
  HostBinding,
  HostListener,
  OnInit,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-developer-action',
  templateUrl: './developer-action.component.html',
  styleUrls: ['./developer-action.component.scss'],
})
export class DeveloperActionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log(this.eClick);
  }

  @Input() eClick: Function;
}
