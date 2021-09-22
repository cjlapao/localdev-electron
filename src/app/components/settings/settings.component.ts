import { Settings } from './../../../../app/src/interfaces/settings';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { cpus } from 'os';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnChanges {
  public settings: Settings;
  public settingsForm: FormGroup;

  constructor(private settingsSvc: SettingsService, public fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  get s() {
    return this.settingsForm.controls;
  }

  async ngOnInit() {
    this.settings = await this.settingsSvc.get();
    this.settingsForm = this.fb.group({
      cpus: new FormControl('', [
        Validators.min(2),
        Validators.max(8),
        Validators.required,
      ]),
    });
  }

  async upsertSettings() {
    console.log(this.settingsForm);
    if (this.settingsForm.valid) {
      console.log(this.settings);
      this.settings.cluster.cpusNumber = this.settingsForm.value.cpus;
      await this.settingsSvc.upsert(this.settings);
    }
  }
}
