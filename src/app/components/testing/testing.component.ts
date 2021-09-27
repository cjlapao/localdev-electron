import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { faVial } from '@fortawesome/pro-regular-svg-icons';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
})
export class TestingComponent implements OnInit {
  faVial = faVial;
  isReady = false;
  chartTestValues: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isReady = true;
    this.chartTestValues = this.fb.group({
      chartValues: this.fb.array([]),
    });
  }

  get chartValues(): FormArray {
    return this.chartTestValues.get('chartValues') as FormArray;
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
