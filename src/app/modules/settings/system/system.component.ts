import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Settings } from '../../../../../app/src/interfaces/settings';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit {
  @Input() settings: Settings;
  @Input() settingsForm: FormGroup;
  @Input() system: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
