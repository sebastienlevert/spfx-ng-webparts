import { Component, Input, ViewChild, AfterViewInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { MatHorizontalStepper, MatStep } from '@angular/material/stepper';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'site-provisioning',
  templateUrl: 'site-provisioning.html',
  styleUrls: [ 'site-provisioning.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class SiteProvisioning {
  isLinear = true;
  basicInformationGroup: FormGroup;
  advancedInformationGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.basicInformationGroup = this._formBuilder.group({
      groupTitle: ['', Validators.required],
      groupDescription: ['', Validators.required],
      groupUrl: ['', Validators.required]
    });
    this.advancedInformationGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
