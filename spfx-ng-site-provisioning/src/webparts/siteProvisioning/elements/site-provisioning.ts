import 'hammerjs';
import { Component, Input, ViewChild, AfterViewInit, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { MatHorizontalStepper, MatStep } from '@angular/material/stepper';
import { MatInput } from '@angular/material/input';
import { MatTextareaAutosize } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ConfigurationService } from '../../../services/configuration-service';
import { ISiteCreationInformation } from '../../../models/index';
import { SitesService } from '../../../services/sites-service';
import { MatDialog } from '@angular/material/dialog';
import { SiteProvisioningDialog } from './site-provisioning-dialog';
import { ISiteCreationResponse } from '../../../models/site-creation-response';
import { TemplatesService } from '../../../services/templates-service';

@Component({
  selector: 'site-provisioning',
  templateUrl: 'site-provisioning.html',
  styleUrls: [ 'site-provisioning.scss' ],
  encapsulation: ViewEncapsulation.None,
  providers: [ ConfigurationService ]
})
export class SiteProvisioning implements AfterViewInit, OnInit {
  @Input() public functionUrl: string;
  @Input() public functionKey: string;
  @Input() public templatesListId: string;

  public isLinear = true;
  public basicInformationGroup: FormGroup;
  public advancedInformationGroup: FormGroup;
  public errorMessage: string = "";
  public groupTitle: string = "";
  public groupDescription: string = "";
  public groupUrl: string = "";
  public groupTemplateUrl: string = "";
  public groupIsPrivate: boolean = false;
  public groupHasTeam: boolean = false;
  public groupHasTemplate: boolean = false;
  public success: boolean = false;
  public createdSite: ISiteCreationResponse = null;
  public templates: any[] = null;

  /**
   * Constructor of the Component
   * @param _formBuilder
   * @param configurationService
   * @param sitesService
   * @param dialog
   * @param listsService
   */
  constructor(
    private _formBuilder: FormBuilder,
    private configurationService: ConfigurationService,
    private sitesService: SitesService,
    private dialog: MatDialog,
    private listsService: TemplatesService
  ) { }

  /**
   * When Angular Inits, initializes the Configuration values and configures the form
   */
  ngOnInit() {
    this.configurationService.load({
      functionUrl: this.functionUrl,
      functionKey: this.functionKey,
      templatesListId: this.templatesListId
    });

    this.configureForm();
  }

  /**
   * After the Angular View is initialized, fetch the data
   */
  public ngAfterViewInit(): void {
    this.loadTemplates();
  }

  /**
   * Loads all the templates based on the provided Templates List Id
   */
  private loadTemplates() {
    if(this.templatesListId) {
      // Gets the templates based on the list specified
      this.listsService.getTemplates(this.templatesListId).then((templates: any) => {
        this.templates = templates;
      });
    }
  }

  /**
   * Configures the Form
   */
  private configureForm(): void {
    this.basicInformationGroup = this._formBuilder.group({
      groupTitle: ['', Validators.required],
      groupDescription: ['', Validators.required],
      groupUrl: ['', Validators.required]
    });

    this.advancedInformationGroup = this._formBuilder.group({
      groupIsPrivate: [],
      groupHasTeam: [],
      groupHasTemplate: [],
      groupTemplateUrl: []
    });

    if(!this.configurationService.isConfigured()) {
      this.basicInformationGroup.disable();
    }
  }

  /**
   * Opens the Loading Dialog
   */
  public openDialog(): void {
    this.dialog.open(SiteProvisioningDialog, {
      disableClose: true
    });
  }

  /**
   * Closes the Loading Dialog
   */
  public closeDialog(): void {
    this.dialog.closeAll();
  }

  /**
   * When the Complete button is clicked, create the Group
   */
  public _onCreateGroup() {
    let siteInformation: ISiteCreationInformation = {
      title: this.groupTitle,
      description: this.groupDescription,
      url: this.groupUrl,
      private: this.groupIsPrivate,
      team: this.groupHasTeam,
      template: this.groupHasTemplate,
      templateUrl: this.advancedInformationGroup.controls.groupTemplateUrl.value
    };

    this.openDialog();

    this.sitesService
      .createSite(siteInformation, this.configurationService)
      .subscribe(
        site => {
          this.createdSite = site;
          this.success = true;
          this.closeDialog();
        },
        error =>  this.errorMessage = error);
  }
}
