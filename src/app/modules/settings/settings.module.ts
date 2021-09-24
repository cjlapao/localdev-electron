import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SystemComponent } from './system/system.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SettingsComponent, SystemComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FontAwesomeModule,
    SharedModule,
  ],
})
export class SettingsModule {}
