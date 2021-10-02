import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelmChartValuesComponent } from './helm-chart-values/helm-chart-values.component';
import { HelmChartValueComponent } from './helm-chart-values/helm-chart-value/helm-chart-value.component';
import { HelmChartComponent } from './helm-chart/helm-chart.component';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HelmChartValuesComponent,
    HelmChartValueComponent,
    HelmChartComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FontAwesomeModule,
    MatButtonModule,
    MatChipsModule,
    MatTooltipModule,
  ],
  exports: [
    HelmChartValuesComponent,
    HelmChartValueComponent,
    HelmChartComponent,
  ],
})
export class HelmChartModule {}
