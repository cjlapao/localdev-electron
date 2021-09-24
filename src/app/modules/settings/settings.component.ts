import { ApplicationRef, Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faCog, faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import { Observable } from 'rxjs';
import { Settings } from '../../../../app/src/interfaces/settings';
import { AddonsService } from '../../services/addons.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @Output()
  public settings: Settings;
  public settingsForm: FormGroup;
  panelOpenState = false;
  faCog = faCog;
  faTrashAlt = faTrashAlt;
  isReady = false;

  filteredAddons: Observable<string[]>[];

  constructor(
    private settingsSvc: SettingsService,
    public fb: FormBuilder,
    private applicationRef: ApplicationRef,
    private addonsSvc: AddonsService
  ) {}

  ngOnInit(): void {}

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
}
