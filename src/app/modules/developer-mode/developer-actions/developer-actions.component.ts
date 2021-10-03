import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { DeveloperActionComponent } from '../developer-action/developer-action.component';

@Component({
  selector: 'app-developer-actions',
  templateUrl: './developer-actions.component.html',
  styleUrls: ['./developer-actions.component.scss'],
})
export class DeveloperActionsComponent implements OnInit, AfterViewInit {
  @ViewChildren(DeveloperActionComponent, { read: ViewContainerRef })
  actions: QueryList<DeveloperActionComponent>;
  constructor() {}
  ngAfterViewInit(): void {
    this.actions.changes.subscribe((s) => {
      console.log(s);
    });
  }

  ngOnInit(): void {}
}
