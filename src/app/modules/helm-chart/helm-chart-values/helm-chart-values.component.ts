import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { faPlusCircle, faVial } from '@fortawesome/pro-regular-svg-icons';

@Component({
  selector: 'app-helm-chart-values',
  templateUrl: './helm-chart-values.component.html',
  styleUrls: ['./helm-chart-values.component.scss'],
})
export class HelmChartValuesComponent implements OnInit {
  faVial = faVial;
  faPlusCircle = faPlusCircle;
  isReady = false;
  chartTestValues: FormGroup;
  @Input() helmChartGroup: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isReady = true;
    this.chartTestValues = this.fb.group({
      chartValues: this.fb.array([]),
    });
  }

  get chartValues(): FormArray {
    return this.helmChartGroup.get('chartValues') as FormArray;
  }

  getChartValueControl(index: number): FormGroup {
    const control = this.chartValues.controls[index] as FormGroup;
    return control;
  }

  addChartValue() {
    const control = this.fb.group({
      key: this.fb.control(''),
      value: this.fb.control(''),
    });
    this.chartValues.push(control);
  }

  testSave() {
    console.log(this.chartTestValues.value);
  }

  testObject() {}
}
