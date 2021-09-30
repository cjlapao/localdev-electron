import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {
  faMinusCircle,
  faPlusCircle,
} from '@fortawesome/pro-regular-svg-icons';
import { KeyboardEvent } from 'electron/main';

@Component({
  selector: 'app-helm-chart-value',
  templateUrl: './helm-chart-value.component.html',
  styleUrls: ['./helm-chart-value.component.scss'],
})
export class HelmChartValueComponent implements OnInit {
  @Input() chartValueControl: AbstractControl;
  @Input() index: number = -1;
  @Input() parent: FormArray;

  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  chartValues: FormArray;
  isReady = false;
  isValueChartType = false;
  valueArrayItems: string[];
  constructor(
    private fb: FormBuilder,
    private applicationRef: ApplicationRef
  ) {
    this.valueArrayItems = []
  }

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

  get valueContent(): string {
    const result = this.chartValueControl.get('value').value
    if (result && typeof result === 'string') {
      return result as string
    }
    return null
  }

  addValueArrayItem() {
    const value = this.chartValueControl.get('value')
    if (value) {
      console.log(value)
    }
  }
  addSubItem() {
    console.log(`button clicked ${this.isValueChartType}`);
    const valueControl = this.fb.group({
      key: this.fb.control(''),
      value: this.fb.control(''),
    });
    valueControl.get('value').valueChanges.subscribe((change: string) => {
      if (change.includes(", ")) {
        let word  = change.substring(0, change.indexOf(','))
        console.log(word)
      }
    })
    this.chartValues.push(valueControl);
  }

  remove() {
    if (this.parent?.controls?.length > 0 && this.index >= 0) {
      this.parent.removeAt(this.index);
      this.parent.markAllAsTouched();
      this.applicationRef.tick();
    }
  }

  onValueChange(event: InputEvent) {
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
