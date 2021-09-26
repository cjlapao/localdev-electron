import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SystemComponent } from './system/system.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClusterComponent } from './cluster/cluster.component';
import { GlobalValuesComponent } from './global-values/global-values.component';
import { NamespacesComponent } from './namespaces/namespaces.component';
import { DefaultAddonsComponent } from './default-addons/default-addons.component';
import { AzureServicePrincipalComponent } from './azure-service-principal/azure-service-principal.component';
import { DefaultExtrasComponent } from './default-extras/default-extras.component';

@NgModule({
  declarations: [SettingsComponent, SystemComponent, ClusterComponent, GlobalValuesComponent, NamespacesComponent, DefaultAddonsComponent, AzureServicePrincipalComponent, DefaultExtrasComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FontAwesomeModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class SettingsModule {}
