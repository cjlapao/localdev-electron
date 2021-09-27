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
import { HelmChartValueControlComponent } from './helm-chart-value-control/helm-chart-value-control.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [LoaderComponent, HelmChartValueControlComponent],
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
  ],
  exports: [
    LoaderComponent,
    HelmChartValueControlComponent,
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
  ],
})
export class SharedModule {}
