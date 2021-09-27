import { faPlusCircle } from '@fortawesome/pro-regular-svg-icons';
import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { type } from 'os';

@Component({
  selector: 'app-helm-chart-value-control',
  templateUrl: './helm-chart-value-control.component.html',
  styleUrls: ['./helm-chart-value-control.component.scss'],
})
export class HelmChartValueControlComponent implements OnInit {
  @Input() chartValueControl: AbstractControl;

  faPlusCircle = faPlusCircle;

  chartValues: FormArray;
  isReady = false;
  isValueChartType = false;
  constructor(
    private fb: FormBuilder,
    private applicationRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    this.isReady = true;
    console.log(this.chartValueControl);
  }

  isChartTypeValue(): boolean {
    const value = this.chartValueControl.get('value').value;
    if (!value && value !== '') {
      return false;
    }

    if (typeof value === 'string') {
      return false;
    }

    return true;
  }

  get chartTypeValue(): FormGroup {
    return this.chartValueControl.get('value') as FormGroup;
  }

  get control(): FormGroup {
    return this.chartValueControl as FormGroup;
  }

  addSubItem() {
    console.log(`button clicked ${this.isValueChartType}`);
    const valueControl = this.fb.group({
      key: this.fb.control(''),
      value: this.fb.control(''),
    });
    this.chartValues.push(valueControl);
  }

  public toggle(event: MatSlideToggleChange) {
    console.log('toggle', event.checked);
    if (event.checked) {
      this.chartValues = this.fb.array([]);
      this.addSubItem();
      this.control.setControl('value', this.chartValues);
      console.log(this.control.get('value'));
    } else {
      const stringControl = this.fb.control('');
      this.control.setControl('value', stringControl);
    }
    this.isValueChartType = event.checked;
    this.applicationRef.tick();
  }

  get testToggle(): boolean {
    return this.isValueChartType;
  }

  addChartChartValue() {}
}
