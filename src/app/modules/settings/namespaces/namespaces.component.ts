import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import { Settings } from '../../../../../app/src/interfaces/settings';

@Component({
  selector: 'app-namespaces-settings',
  templateUrl: './namespaces.component.html',
  styleUrls: ['./namespaces.component.scss'],
})
export class NamespacesComponent implements OnInit {
  @Input() settings: Settings;
  @Input() settingsForm: FormGroup;
  @Input() namespaces: FormArray;
  faTrashAlt = faTrashAlt;

  constructor(public fb: FormBuilder, private applicationRef: ApplicationRef) {}

  ngOnInit(): void {}

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
}
