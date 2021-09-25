import { ApplicationRef, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faCog } from '@fortawesome/pro-regular-svg-icons';
import { Settings } from '../../../../app/src/interfaces/settings';
import { AddonsService } from '../../services/addons.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  private _isReady = false;
  public settings: Settings;
  public settingsForm: FormGroup;
  faCog = faCog;

  get isReady(): boolean {
    return this._isReady;
  }

  get systemFormGroup(): FormGroup {
    return this.settingsForm.get('system') as FormGroup;
  }

  get clusterFormGroup(): FormGroup {
    return this.settingsForm.get('cluster') as FormGroup;
  }

  get globalValuesFormArray(): FormArray {
    return this.settingsForm.get('globalValues') as FormArray;
  }

  get namespacesFormArray(): FormArray {
    return this.settingsForm.get('namespaces') as FormArray;
  }

  get defaultAddonsFormArray(): FormArray {
    return this.settingsForm.get('defaultAddons') as FormArray;
  }

  get azureFormArray(): FormArray {
    return this.settingsForm.get('azure') as FormArray;
  }

  constructor(
    private settingsSvc: SettingsService,
    public fb: FormBuilder,
    private applicationRef: ApplicationRef,
    private addonsSvc: AddonsService
  ) {}

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
      defaultAddons: this.fb.array([]),
      azure: this.fb.array([]),
    });
    console.log('almost');
    this._isReady = true;
  }

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
      this._convertFormArrayToAzureSP();

      await this.settingsSvc.upsert(this.settings);
      this.settingsForm.markAsPristine();
      this.settingsForm.markAsUntouched();
      console.log(this.settings);
    }
  }

  private _convertFormArrayToGlobalValues(): void {
    this.globalValuesFormArray.value.forEach((v) => {
      let exists = this.settings.globalValues.find((f) => f.name === v.key);
      if (exists) {
        exists.value = v.value;
      } else {
        this.settings.globalValues.push({ name: v.key, value: v.value });
      }
    });
    // check for the deleted ones
    this.settings.globalValues.forEach((v, vIdx) => {
      let idx = this.globalValuesFormArray.value.findIndex(
        (f) => f.key === v.name
      );
      if (idx == -1) {
        this.settings.globalValues.splice(vIdx, 1);
      }
    });
  }

  private _convertFormArrayToNamespaces(): void {
    this.namespacesFormArray.value.forEach((v) => {
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
      let idx = this.namespacesFormArray.value.findIndex(
        (f) => f.name === v.name
      );
      if (idx == -1) {
        this.settings.namespaces.splice(vIdx, 1);
      }
    });
  }

  private _convertFormArrayToDefaultAddons(): void {
    console.log(this.addonsSvc.defaultAddons);
    this.defaultAddonsFormArray.value.forEach((v) => {
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
      let idx = this.defaultAddonsFormArray.value.findIndex(
        (f) => f.toLowerCase() === addon.name.toLowerCase()
      );
      if (idx == -1) {
        this.settings.defaultAddons.splice(vIdx, 1);
      }
    });
  }

  private _convertFormArrayToAzureSP(): void {
    this.azureFormArray.value.forEach((v) => {
      let exists = this.settings.azure.find(
        (f) => f.applicationId === v.applicationId
      );
      if (exists) {
        exists.tenantId = v.tenantId;
        exists.subscriptionId = v.subscriptionId;
        exists.subscriptionName = v.subscriptionName;
        exists.applicationId = v.applicationId;
        exists.applicationName = v.applicationName;
        exists.applicationPassword = Buffer.from(
          v.applicationPassword
        ).toString('base64');
      } else {
        this.settings.azure.push({
          tenantId: v.tenantId,
          subscriptionId: v.subscriptionId,
          subscriptionName: v.subscriptionName,
          applicationId: v.applicationId,
          applicationName: v.applicationName,
          applicationPassword: Buffer.from(v.applicationPassword).toString(
            'base64'
          ),
        });
      }
    });
    // check for the deleted ones
    this.settings.azure.forEach((v, vIdx) => {
      let idx = this.azureFormArray.value.findIndex(
        (f) => f.applicationId === v.applicationId
      );
      if (idx == -1) {
        this.settings.azure.splice(vIdx, 1);
      }
    });
  }
}
