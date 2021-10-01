import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {
  faMinusCircle,
  faPlusCircle,
} from '@fortawesome/pro-regular-svg-icons';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-helm-chart-value',
  templateUrl: './helm-chart-value.component.html',
  styleUrls: ['./helm-chart-value.component.scss'],
})
export class HelmChartValueComponent implements OnInit {
  @Input() chartValueControl: AbstractControl;
  @Input() index: number = -1;
  @Input() parent: FormArray;
  selectable = true;
  removable = true;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chartValues: FormArray;
  isReady = false;
  isValueChartType = false;
  valueChips: string[];
  valueChipControl: FormControl;
  constructor(private fb: FormBuilder, private applicationRef: ApplicationRef) {
    this.valueChips = [];
    this.valueChipControl = fb.control('');
  }

  ngOnInit(): void {
    this.isReady = true;
    console.log(this.chartValueControl);
  }

  get chartTypeValue(): FormGroup {
    return this.chartValueControl.get('value') as FormGroup;
  }

  get control(): FormGroup {
    return this.chartValueControl as FormGroup;
  }

  get valueControl(): FormControl {
    return this.chartValueControl.get('value') as FormControl;
  }

  get valueContent(): string {
    const result = this.chartValueControl.get('value').value;
    if (result && typeof result === 'string') {
      return result as string;
    }
    return null;
  }

  addValueChip(event: MatChipInputEvent) {
    console.log(event);
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.valueChips.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.chartValueControl?.get('value').setValue(this.valueChips);

    // this.valueChipControl.setValue(null);
  }

  removeValueChip(index: number) {
    if (index >= 0) {
      this.valueChips.splice(index, 1);
    }

    if (this.valueChips.length === 0) {
      this.chartValueControl.get('value').setValue('');
    }
  }

  addSubItem() {
    console.log(`button clicked ${this.isValueChartType}`);
    const valueControl = this.fb.group({
      key: this.fb.control(''),
      value: this.fb.control(''),
    });
    this.chartValues.push(valueControl);
  }

  remove() {
    if (this.parent?.controls?.length > 0 && this.index >= 0) {
      this.parent.removeAt(this.index);
      this.parent.markAllAsTouched();
      this.applicationRef.tick();
    }
  }

  onValueChange(event: InputEvent) {}

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
