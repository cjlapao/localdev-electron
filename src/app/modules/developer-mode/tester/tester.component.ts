import { DeveloperActionsComponent } from './../developer-actions/developer-actions.component';
import { DeveloperActionComponent } from './../developer-action/developer-action.component';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewRef,
} from '@angular/core';
import { facDeveloperMode } from '../../shared/custom-icons/custom-icons';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss'],
})
export class TesterComponent
  implements OnInit, AfterViewInit, AfterContentInit
{
  @Input() enable = false;
  facDeveloperMode = facDeveloperMode;
  @ContentChildren(DeveloperActionComponent, { read: ViewRef })
  actions!: QueryList<ViewRef>;
  @ViewChild(DeveloperActionsComponent, { read: ViewContainerRef })
  actionsComponent: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterContentInit(): void {
    // console.log(this.actions);
    // console.log(this.factory);
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  testClick() {
    console.log(this.actions);
  }
}
