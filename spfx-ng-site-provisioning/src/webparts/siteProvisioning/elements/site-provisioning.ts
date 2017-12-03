import { Component, Input, ViewChild, AfterViewInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { MatHorizontalStepper, MatStep } from '@angular/material/stepper';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'site-provisioning',
  templateUrl: 'site-provisioning.html',
  styleUrls: [ 'site-provisioning.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class SiteProvisioning {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
