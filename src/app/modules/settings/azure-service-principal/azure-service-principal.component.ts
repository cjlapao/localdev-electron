import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faTrashAlt, faBug } from '@fortawesome/pro-regular-svg-icons';
import { Settings } from '../../../../../app/src/interfaces/settings';

@Component({
  selector: 'app-azure-service-principal-settings',
  templateUrl: './azure-service-principal.component.html',
  styleUrls: ['./azure-service-principal.component.scss'],
})
export class AzureServicePrincipalComponent implements OnInit {
  @Input() settings: Settings;
  @Input() settingsForm: FormGroup;
  @Input() azureSP: FormArray;
  faTrashAlt = faTrashAlt;
  faBug = faBug;

  constructor(public fb: FormBuilder, private applicationRef: ApplicationRef) {}

  ngOnInit(): void {
    this.convertAzureSPToFormArray();
  }

  convertAzureSPToFormArray() {
    let globalValues = this.azureSP;
    this.settings.azure.forEach((v) => {
      const control = this.fb.group({
        tenantId: new FormControl(v.tenantId, [
          Validators.required,
          Validators.pattern(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
          ),
        ]),
        subscriptionId: new FormControl(v.subscriptionId, [
          Validators.required,
          Validators.pattern(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
          ),
        ]),
        subscriptionName: new FormControl(v.subscriptionName, [
          Validators.required,
        ]),
        applicationId: new FormControl(v.applicationId, [
          Validators.required,
          Validators.pattern(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
          ),
        ]),
        applicationName: new FormControl(v.applicationName, [
          Validators.required,
        ]),
        applicationPassword: new FormControl(
          Buffer.from(v.applicationPassword, 'base64'),
          [Validators.required]
        ),
      });
      globalValues.push(control);
    });
  }

  addAzureSP() {
    const control = this.fb.group({
      tenantId: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        ),
      ]),
      subscriptionId: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        ),
      ]),
      subscriptionName: new FormControl('', [Validators.required]),
      applicationId: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        ),
      ]),
      applicationName: new FormControl('', [Validators.required]),
      applicationPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.azureSP.push(control);
    this.applicationRef.tick();
  }

  removeAzureSP(index: any) {
    this.azureSP.removeAt(index);
    this.azureSP.markAllAsTouched();
    this.settingsForm.markAsTouched();
  }

  testError(index: number) {
    console.log(this.azureSP.controls[index].get('applicationPassword').errors);
  }
}
