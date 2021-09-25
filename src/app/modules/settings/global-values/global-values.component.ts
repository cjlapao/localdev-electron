import { Component, OnInit, Input, ApplicationRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import { Settings } from '../../../../../app/src/interfaces/settings';

@Component({
  selector: 'app-global-values-settings',
  templateUrl: './global-values.component.html',
  styleUrls: ['./global-values.component.scss'],
})
export class GlobalValuesComponent implements OnInit {
  @Input() settings: Settings;
  @Input() settingsForm: FormGroup;
  @Input() globalValues: FormArray;
  faTrashAlt = faTrashAlt;

  constructor(public fb: FormBuilder, private applicationRef: ApplicationRef) {}

  ngOnInit(): void {
    this.convertGlobalValuesToFormArray();
  }

  convertGlobalValuesToFormArray() {
    let globalValues = this.globalValues;
    this.settings.globalValues.forEach((v) => {
      const control = this.fb.group({
        key: new FormControl(v.name),
        value: new FormControl(v.value),
      });
      globalValues.push(control);
    });
  }

  addGlobalValues() {
    const control = this.fb.group({
      key: new FormControl(''),
      value: new FormControl(''),
    });
    this.globalValues.push(control);
    this.applicationRef.tick();
  }

  removeGlobalValues(index: any) {
    this.globalValues.removeAt(index);
    this.globalValues.markAllAsTouched();
    this.settingsForm.markAsTouched();
  }
}
