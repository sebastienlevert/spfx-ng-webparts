import { Component, NgModule, Input, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';

@Component({
  selector: 'hello-world-material',
  templateUrl: './hello-world.html',
  styleUrls: [ './hello-world.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class HelloWorldMaterial {
  @Input() name: string;
  myData: any[];
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule
  ],
  declarations: [HelloWorldMaterial],
  entryComponents: [HelloWorldMaterial]
})
export class HelloWorldMaterialModule {
  ngDoBootstrap(){}
}
