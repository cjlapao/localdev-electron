import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TesterComponent } from './tester/tester.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { DeveloperActionComponent } from './developer-action/developer-action.component';
import { DeveloperActionsComponent } from './developer-actions/developer-actions.component';

@NgModule({
  declarations: [TesterComponent, DeveloperActionComponent, DeveloperActionsComponent],
  imports: [CommonModule, FontAwesomeModule, MatButtonModule],
  exports: [TesterComponent, DeveloperActionComponent],
})
export class DeveloperModeModule {}
