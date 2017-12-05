import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'angular-material',
  templateUrl: 'angular-material.html',
  styleUrls: [ 'angular-material.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class AngularMaterial {
  @Input() public name: string;
}
