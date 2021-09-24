import { DefaultAddon } from './../../entities/addons';
import { map, Observable, retry, startWith } from 'rxjs';
import {
  Settings,
  GlobalValue,
} from './../../../../app/src/interfaces/settings';
import {
  ApplicationRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { faCog, faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import { AddonsService } from '../../services/addons.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public settings: Settings;
  public settingsForm: FormGroup;
  panelOpenState = false;
  facog = faCog;
  faTrashAlt = faTrashAlt;
  isReady = false;

  filteredAddons: Observable<string[]>[];

  constructor(
    private settingsSvc: SettingsService,
    public fb: FormBuilder,
    private applicationRef: ApplicationRef,
    private addonsSvc: AddonsService
  ) {}

  formatClusterMemory(value: number) {
    return `${value}Gb`;
  }

  formatClusterDisk(value: number) {
    return `${value}Gb`;
  }

  testError() {
    this.namespaces.controls.forEach((c) => {
      let name = c.get('name');
      console.log(name);
      console.log(name.errors);
    });
  }

  async ngOnInit() {
    this.filteredAddons = [];
    this.settings = await this.settingsSvc.get();
    this.settingsForm = this.fb.group({
      system: new FormGroup({
        keepLastBackups: new FormControl(this.settings.system.keepLastBackups, [
          Validators.required,
        ]),
        retry: new FormControl(this.settings.system.retry, [
          Validators.required,
        ]),
      }),
      cluster: new FormGroup({
        cpusNumber: new FormControl(
          parseInt(this.settings.cluster.cpusNumber),
          [Validators.min(2), Validators.max(8), Validators.required]
        ),
        memorySize: new FormControl(
          parseInt(this.settings.cluster.memorySize) / 1024,
          [Validators.min(2), Validators.max(16), Validators.required]
        ),
        diskSize: new FormControl(
          parseInt(this.settings.cluster.diskSize.replace('g', '')),
          [Validators.min(20), Validators.max(120), Validators.required]
        ),
        ethernetName: new FormControl(this.settings.cluster.ethernetName, [
          Validators.required,
        ]),
        createExternalSwitch: new FormControl(
          this.settings.cluster.createExternalSwitch
        ),
        defaultNamespace: new FormControl(
          this.settings.cluster.defaultNamespace,
          [Validators.required]
        ),
        startTunnelAutomatically: new FormControl(
          this.settings.cluster.startTunnelAutomatically
        ),
        vSwitchName: new FormControl(this.settings.cluster.vSwitchName, [
          Validators.required,
        ]),
      }),
      globalValues: this.fb.array([]),
      namespaces: this.fb.array([]),
      defaultAddons: this.fb.array([]),
    });

    this.convertGlobalValuesToFormArray();
    this.convertNamespacesToFormArray();
    this.convertDefaultAddonsToFormArray();
    this.isReady = true;
  }

  get globalValues(): FormArray {
    return this.settingsForm.get('globalValues') as FormArray;
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

  get namespaces(): FormArray {
    return this.settingsForm.get('namespaces') as FormArray;
  }

  convertNamespacesToFormArray() {
    let namespaces = this.namespaces;
    this.settings.namespaces.forEach((v) => {
      const control = this.fb.group({
        name: new FormControl(v.name),
        injectSidecar: new FormControl(v.injectSidecar),
      });
      namespaces.push(control);
    });
  }

  addNamespace() {
    const control = this.fb.group({
      name: new FormControl('', [
        Validators.pattern('(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{1,63}(?<!-))$)'),
        Validators.required,
      ]),
      injectSidecar: new FormControl(false),
    });
    this.namespaces.push(control);
  }

  removeNamespace(index: any) {
    this.namespaces.removeAt(index);
    this.namespaces.markAllAsTouched();
    this.settingsForm.markAsTouched();
    this.applicationRef.tick();
  }

  //#region Default Addons
  get defaultAddons(): FormArray {
    return this.settingsForm.get('defaultAddons') as FormArray;
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

  private _convertFormArrayToDefaultAddons(): void {
    console.log(this.addonsSvc.defaultAddons);
    this.defaultAddons.value.forEach((v) => {
      const addon = this.addonsSvc.defaultAddons.find(
        (a) => a.name.toLowerCase() == v.toLowerCase()
      );
      let exists = this.settings.defaultAddons.find((f) => f === addon.id);
      if (!exists) {
        console.log(addon);
        if (addon) {
          console.log(`found addon ${addon}`);
          this.settings.defaultAddons.push(addon.id);
        }
      }
    });

    // check for the deleted ones
    this.settings.defaultAddons.forEach((v, vIdx) => {
      const addon = this.addonsSvc.defaultAddons.find(
        (addon) => addon.id === v
      );
      let idx = this.defaultAddons.value.findIndex(
        (f) => f.toLowerCase() === addon.name.toLowerCase()
      );
      if (idx == -1) {
        this.settings.defaultAddons.splice(vIdx, 1);
      }
    });
  }

  private _filterAddons(value: string): string[] {
    const filteredValue = value.toLowerCase();
    const result = this.availableAddons.filter((addon) =>
      addon.toLowerCase().startsWith(filteredValue)
    );
    return result;
  }
  //#endregion

  async upsertSettings() {
    console.log(this.settingsForm);
    if (this.settingsForm.valid) {
      this.settings.cluster.cpusNumber =
        this.settingsForm.value.cluster.cpusNumber;
      this.settings.cluster.memorySize = (
        this.settingsForm.value.cluster.memorySize * 1024
      ).toString();

      this._convertFormArrayToGlobalValues();
      this._convertFormArrayToNamespaces();
      this._convertFormArrayToDefaultAddons();

      await this.settingsSvc.upsert(this.settings);
      this.settingsForm.markAsPristine();
      this.settingsForm.markAsUntouched();
      console.log(this.settings);
    }
  }

  private _convertFormArrayToGlobalValues(): void {
    this.globalValues.value.forEach((v) => {
      let exists = this.settings.globalValues.find((f) => f.name === v.key);
      if (exists) {
        exists.value = v.value;
      } else {
        this.settings.globalValues.push({ name: v.key, value: v.value });
      }
    });
    // check for the deleted ones
    this.settings.globalValues.forEach((v, vIdx) => {
      let idx = this.globalValues.value.findIndex((f) => f.key === v.name);
      if (idx == -1) {
        this.settings.globalValues.splice(vIdx, 1);
      }
    });
  }

  private _convertFormArrayToNamespaces(): void {
    this.namespaces.value.forEach((v) => {
      let exists = this.settings.namespaces.find((f) => f.name === v.name);
      if (exists) {
        exists.name = v.name;
        exists.injectSidecar = v.injectSidecar;
      } else {
        this.settings.namespaces.push({
          name: v.name,
          injectSidecar: v.injectSidecar,
        });
      }
    });
    // check for the deleted ones
    this.settings.namespaces.forEach((v, vIdx) => {
      let idx = this.namespaces.value.findIndex((f) => f.name === v.name);
      if (idx == -1) {
        this.settings.namespaces.splice(vIdx, 1);
      }
    });
  }
}
