import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-helm-chart',
  templateUrl: './helm-chart.component.html',
  styleUrls: ['./helm-chart.component.scss'],
})
export class HelmChartComponent implements OnInit {
  isReady = false;
  @Input() helmChartGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isReady = true;
    if (!this.helmChartGroup) {
      console.log('does not exists')
      this.helmChartGroup = this.fb.group({
        name: this.fb.control('', [Validators.required]),
        path: this.fb.control('', [Validators.required]),
        chartValues: this.fb.array([]),
      });
    }
  }

  test(): string {
    return JSON.stringify(this.helmChartGroup.value)
  }
}
