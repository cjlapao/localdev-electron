import {
  Helm,
  HelmChartValue,
} from './../../../../../app/src/interfaces/settings';
import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Settings } from '../../../../../app/src/interfaces/settings';
import { map, Observable, startWith } from 'rxjs';
import { faTrashAlt, faPlusCircle } from '@fortawesome/pro-regular-svg-icons';
import { ExtrasKubernetesAddonsService } from '../../../services/extras-kubernetes-addons.service';

@Component({
  selector: 'app-default-extras-settings',
  templateUrl: './default-extras.component.html',
  styleUrls: ['./default-extras.component.scss'],
})
export class DefaultExtrasComponent implements OnInit {
  @Input() settings: Settings;
  @Input() settingsForm: FormGroup;
  @Input() defaultExtras: FormArray;

  filteredExtras: Observable<string[]>[];
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;

  constructor(
    public fb: FormBuilder,
    private applicationRef: ApplicationRef,
    private extrasSvc: ExtrasKubernetesAddonsService
  ) {
    this.filteredExtras = [];
  }

  ngOnInit(): void {
    this.convertDefaultExtrasToFormArray();
  }

  get availableExtras(): string[] {
    const selectedAddons = this.defaultExtras.value as string[];
    return this.extrasSvc.addons
      .filter((f) => {
        const idx = selectedAddons.findIndex((i) => i === f.name);
        return idx < 0;
      })
      .map((m) => m.name);
  }

  convertDefaultExtrasToFormArray() {
    const defaultExtras = this.defaultExtras;
    const availableExtras = this.extrasSvc.addons;
    this.settings.extraKubernetesServices.forEach((v) => {
      const addon = availableExtras.find((f) => f.id === v.id);
      if (addon) {
        const control = new FormControl(addon.name);
        this.filteredExtras.push(
          control.valueChanges.pipe(
            startWith(''),
            map((value) => this._filterAddons(value))
          )
        );
        defaultExtras.push(control);
      }
    });
  }

  addDefaultExtra() {
    const control = this.fb.group({
      id: new FormControl(''),
      name: new FormControl(''),
      helm: this.fb.group({
        name: new FormControl(''),
        path: new FormControl(''),
        chartValueFile: new FormArray([]),
      }),
    });

    // this.filteredExtras.push(
    //   control.valueChanges.pipe(
    //     startWith(''),
    //     map((value) => this._filterAddons(value))
    //   )
    // );
    console.log(control);
    this.defaultExtras.push(control);
    console.log(this.defaultExtras.controls.length);
  }

  addHelmChartKeyValue(index: number) {
    const helmControl = this.defaultExtras.controls[index].get(
      'helm'
    ) as FormGroup;
    if (helmControl) {
      const helmChartValueFile = helmControl.get('chartValueFile') as FormArray;
      if (helmChartValueFile) {
        const control = this.fb.group({
          key: new FormControl(''),
          value: new FormControl(''),
        });
        helmChartValueFile.push(control);
      }
    }
    console.log(this.defaultExtras);
  }

  getHelmChartValueFile(index: number): FormArray {
    const helmControl = this.defaultExtras.controls[index].get('helm');
    if (helmControl) {
      console.log('yes to the control');
      const helmChartValueFile = helmControl.get('chartValueFile') as FormArray;
      if (helmChartValueFile) {
        console.log('yep');
        return helmChartValueFile;
      }
    }

    return new FormArray([]);
  }

  isChartValueKeyString(extraIndex: number, keyIndex: number): boolean {
    const helmControl = this.defaultExtras.controls[extraIndex].get('helm');
    if (helmControl) {
      console.log('yes to the control found in search of type');
      const helmChartValueFile = helmControl.get('chartValueFile') as FormArray;
      if (helmChartValueFile) {
        console.log('yep found thge chagrt');
        const chartValueFileKey =
          helmChartValueFile.controls[keyIndex].get('value');
        console.log(typeof chartValueFileKey);
        return typeof chartValueFileKey === 'string';
      }
    }
    return null;
  }

  removeDefaultExtra(index: any) {
    this.defaultExtras.removeAt(index);
    this.filteredExtras.splice(index, 1);
    this.defaultExtras.markAllAsTouched();
    this.settingsForm.markAsTouched();
    this.applicationRef.tick();
  }

  private _filterAddons(value: string): string[] {
    console.log(value);
    const filteredValue = value.toLowerCase();
    const result = this.availableExtras.filter((addon) =>
      addon.toLowerCase().startsWith(filteredValue)
    );
    return result;
  }
}
