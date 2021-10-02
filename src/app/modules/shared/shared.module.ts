import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HelmChartValuesControlComponent } from './helm-chart-values-control/helm-chart-values-control.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HelmChartModule } from '../helm-chart/helm-chart.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeveloperModeModule } from '../developer-mode/developer-mode.module';

@NgModule({
  declarations: [LoaderComponent, HelmChartValuesControlComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatGridListModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    HelmChartModule,
    MatChipsModule,
    MatTooltipModule,
    DeveloperModeModule,
  ],
  exports: [
    LoaderComponent,
    HelmChartValuesControlComponent,
    ReactiveFormsModule,
    MatExpansionModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatGridListModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    HelmChartModule,
    MatChipsModule,
    MatTooltipModule,
    DeveloperModeModule,
  ],
})
export class SharedModule {}
