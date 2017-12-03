import { Component, NgModule, Input, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, HttpClientResponse, IGraphHttpClientOptions } from '@microsoft/sp-http'


@Component({
  selector: 'list-rest',
  templateUrl: './list-rest.html',
  styleUrls: [ './list-rest.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class ListRest {
  @Input() context: WebPartContext;
  public lists: Promise<any[]>;

  ngOnInit(){
    if(!this.context){
      console.error('Please provide the context!');
      return;
    }

    this.lists = this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists`, SPHttpClient.configurations.v1)
      .then(res => res.json())
      .then(res => res.value)
      .catch(err => console.log(err));
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [ListRest],
  entryComponents: [ListRest]
})
export class ListRestModule {
  ngDoBootstrap(){}
}
