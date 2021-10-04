import {
  facDeveloperMode,
  facIvanti,
  facValidate,
} from './../../modules/shared/custom-icons/custom-icons';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faVial, faPlusCircle } from '@fortawesome/pro-regular-svg-icons';
import { LoggerService } from '../../services/logger.service';
import { LogEntry, LogType } from '../../entities/logger';
import { filter, pipe } from 'rxjs';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
})
export class TestingComponent implements OnInit {
  faVial = faVial;
  faPlusCircle = faPlusCircle;
  facIvanti = facIvanti;
  facValidate = facValidate;
  isReady = false;
  chartTestValues: FormGroup;
  developerMode: boolean = false;
  facDeveloperMode = facDeveloperMode;
  logs: LogEntry[];
  constructor(private fb: FormBuilder, private logger: LoggerService) {
    this.logger.className = 'TestingComponent';
    this.logs = [];
    // logger.log.subscribe(pipe(filter))
  }

  ngOnInit(): void {
    this.isReady = true;
    this.chartTestValues = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      path: this.fb.control('', [Validators.required]),
      chartValues: this.fb.array([]),
    });
  }

  get chartValues(): FormArray {
    return this.chartTestValues.get('chartValues') as FormArray;
  }

  getChartValueControl(index: number): FormGroup {
    const control = this.chartValues.controls[index] as FormGroup;
    return control;
  }

  addChartValue() {
    const control = this.fb.group({
      key: this.fb.control(''),
      value: this.fb.control(''),
    });
    this.chartValues.push(control);
  }

  testSave() {
    this.logger.className = 'TestingComponent';
    this.logger.info('Clicked on a logger');
    this.logger.className = 'TestingComponentTest';
    this.logger.info('Clicked on a logger test');
    console.log(this.chartTestValues.value);
    this.convertChartValuesToJson(this.chartValues.value);
  }

  convertChartValuesToJson(from: any): object {
    console.log('starting conversion');
    let test = {};
    if (from) {
      if (Array.isArray(from)) {
        const arr = from as any[];
        arr.forEach((o) => {
          if (o.key && o.value) {
            if (typeof o.value === 'string') {
              test[o.key] = o.value;
            } else {
              test[o.key] = this.convertChartValuesToJson(o.value);
            }
          }
        });
      } else if (from.key && from.value) {
        if (typeof from.value === 'string') {
          test[from.key] = from.value;
        } else {
          test[from.key] = this.convertChartValuesToJson(from.value);
        }
      }
      console.log(from);
    }

    console.log(test);
    return test;
  }

  testObject() {}

  testclick() {
    console.log('button was clicked');
  }
}
