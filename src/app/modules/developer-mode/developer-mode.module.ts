import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TesterComponent } from './tester/tester.component';

@NgModule({
  declarations: [TesterComponent],
  imports: [CommonModule],
  exports: [TesterComponent],
})
export class DeveloperModeModule {}
