import {
  AfterViewInit,
  ApplicationRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import { map, Observable, startWith, Subject } from 'rxjs';
import { Settings } from '../../../../../app/src/interfaces/settings';
import { AddonsService } from '../../../services/addons.service';
import { SettingsComponentStatus } from '../common/settings-component-status';

@Component({
  selector: 'app-default-addons-settings',
  templateUrl: './default-addons.component.html',
  styleUrls: ['./default-addons.component.scss'],
})
export class DefaultAddonsComponent implements OnInit {
  @Input() settings: Settings;
  @Input() settingsForm: FormGroup;
  @Input() defaultAddons: FormArray;
  public isReady: boolean = false;
  filteredAddons: Observable<string[]>[];
  faTrashAlt = faTrashAlt;

  constructor(
    public fb: FormBuilder,
    private applicationRef: ApplicationRef,
    private addonsSvc: AddonsService
  ) {
    this.filteredAddons = [];
  }

  ngOnInit(): void {
    this.isReady = true;
    this.convertDefaultAddonsToFormArray();
  }

  get availableAddons(): string[] {
    const selectedAddons = this.defaultAddons.value as string[];
    return this.addonsSvc.defaultAddons
      .filter((f) => {
        const idx = selectedAddons.findIndex((i) => i === f.name);
        return idx < 0;
      })
      .map((m) => m.name);
  }

  convertDefaultAddonsToFormArray() {
    const defaultAddons = this.defaultAddons;
    const availableAddons = this.addonsSvc.defaultAddons;
    this.settings.defaultAddons.forEach((v) => {
      const addon = availableAddons.find((f) => f.id === v);
      if (addon) {
        const control = new FormControl(addon.name);
        this.filteredAddons.push(
          control.valueChanges.pipe(
            startWith(''),
            map((value) => this._filterAddons(value))
          )
        );
        defaultAddons.push(control);
      }
    });
  }

  addDefaultAddon() {
    const control = new FormControl('', [Validators.required]);
    this.filteredAddons.push(
      control.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterAddons(value))
      )
    );
    this.defaultAddons.push(control);
  }

  removeDefaultAddon(index: any) {
    this.defaultAddons.removeAt(index);
    this.filteredAddons.splice(index, 1);
    this.defaultAddons.markAllAsTouched();
    this.settingsForm.markAsTouched();
    this.applicationRef.tick();
  }

  private _filterAddons(value: string): string[] {
    const filteredValue = value.toLowerCase();
    const result = this.availableAddons.filter((addon) =>
      addon.toLowerCase().startsWith(filteredValue)
    );
    return result;
  }
}
