import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Settings } from '../../../../../app/src/interfaces/settings';

@Component({
  selector: 'app-cluster-settings',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.scss'],
})
export class ClusterComponent implements OnInit {
  @Input() settings: Settings;
  @Input() settingsForm: FormGroup;
  @Input() cluster: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  formatClusterMemory(value: number) {
    return `${value}Gb`;
  }

  formatClusterDisk(value: number) {
    return `${value}Gb`;
  }
}
