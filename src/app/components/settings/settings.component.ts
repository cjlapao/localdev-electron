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
} from '@angular/forms';
import { faCog, faTrashAlt } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnChanges {
  public settings: Settings;
  public settingsForm: FormGroup;
  panelOpenState = false;
  facog = faCog;
  faTrashAlt = faTrashAlt;
  constructor(
    private settingsSvc: SettingsService,
    public fb: FormBuilder,
    private applicationRef: ApplicationRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  get s() {
    return this.settingsForm.controls;
  }

  formatClusterMemory(value: number) {
    return `${value}Gb`;
  }

  formatClusterDisk(value: number) {
    return `${value}Gb`;
  }
  async ngOnInit() {
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
    });

    this.convertGlobalValuesToFormArray();
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
    console.log(this.settingsForm);
  }

  get namespaces(): FormArray {
    return this.settingsForm.get('namespaces') as FormArray;
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
    console.log(this.settingsForm);
  }

  async upsertSettings() {
    console.log(this.settingsForm);
    if (this.settingsForm.valid) {
      this.settings.cluster.cpusNumber =
        this.settingsForm.value.cluster.cpusNumber;
      this.settings.cluster.memorySize = (
        this.settingsForm.value.cluster.memorySize * 1024
      ).toString();
      this.globalValues.value.forEach((v) => {
        let exists = this.settings.globalValues.find((f) => f.name === v.key);
        if (exists) {
          exists.value = v.value;
        } else {
          this.settings.globalValues.push({ name: v.key, value: v.value });
        }
      });
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
        console.log(`${v.name}: ${idx}`);
        if (idx == -1) {
          this.settings.globalValues.splice(vIdx, 1);
        }
      });

      await this.settingsSvc.upsert(this.settings);
      this.settingsForm.markAsPristine();
      this.settingsForm.markAsUntouched();
      console.log(this.settings);
    }
  }
}
