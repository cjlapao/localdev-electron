import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {
  faMinusCircle,
  faPlusCircle,
  faVial,
} from '@fortawesome/pro-regular-svg-icons';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { SEPARATOR_KEYS_CODES } from '../../../shared/constants/constants';

@Component({
  selector: 'app-helm-chart-value',
  templateUrl: './helm-chart-value.component.html',
  styleUrls: ['./helm-chart-value.component.scss'],
})
export class HelmChartValueComponent implements OnInit {
  // Input Controls
  @Input() chartValueControl: AbstractControl;
  @Input() index: number = -1;
  @Input() parent: FormArray;
  @Input() selectable = true;
  @Input() removable = true;
  // Icons
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faVial = faVial;
  separatorKeysCodes = SEPARATOR_KEYS_CODES;

  chartValues: FormArray;
  isReady = false;
  isValueChartType = false;

  // Value Chips
  valueChips: string[];
  valueChipControl: FormControl;

  constructor(private fb: FormBuilder, private applicationRef: ApplicationRef) {
    this.valueChips = [];
    this.valueChipControl = fb.control('', [
      Validators.required,
      Validators.minLength(1),
    ]);
  }

  ngOnInit(): void {
    this.isReady = true;
  }

  get control(): FormGroup {
    return this.chartValueControl as FormGroup;
  }

  get valueControl(): FormControl {
    const control = this.chartValueControl.get('value') as FormControl;
    return control;
  }

  get valueContent(): string {
    const result = this.valueControl.value;
    if (result && typeof result === 'string') {
      return result as string;
    }
    return null;
  }

  addValueToChip(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    if (value) {
      this.valueChips.push(value);
    }

    event.chipInput!.clear();

    this.valueControl?.setValue(this.valueChips);
  }

  removeValueFromChip(index: number) {
    if (index >= 0) {
      this.valueChips.splice(index, 1);
    }

    if (this.valueChips.length === 0) {
      this.valueControl.setValue('');
    }
  }

  addChild() {
    const valueControl = this.fb.group({
      key: this.fb.control('', [Validators.required]),
      value: this.fb.control('', [Validators.required]),
    });
    this.chartValues.push(valueControl);
  }

  removeChild() {
    if (this.parent?.controls?.length > 0 && this.index >= 0) {
      this.parent.removeAt(this.index);
      this.parent.markAllAsTouched();
      this.applicationRef.tick();
    }
  }

  toggleChild(event: MatSlideToggleChange) {
    if (event.checked) {
      this.chartValues = this.fb.array([]);
      this.addChild();
      this.control.setControl('value', this.chartValues);
      console.log(this.control.get('value'));
    } else {
      const stringControl = this.fb.control('', [Validators.required]);
      this.control.setControl('value', stringControl);
    }
    this.isValueChartType = event.checked;
    this.applicationRef.tick();
  }
}
