import { IListItem } from './../models/list-item.model';
import { ListsService } from './../services/lists.service';
import { Component, Input, ViewChild, AfterViewInit,ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';
const find = require('lodash/find');

@Component({
  selector: 'angular-material',
  templateUrl: 'angular-material.html',
  styleUrls: [ 'angular-material.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class AngularMaterial implements AfterViewInit {
  private listsService: ListsService;
  private listFields: any[];
  private viewFieldsArray: string[];
  public loading: boolean = true;
  public itemsCount: number = 0;
  public sortedItems: Array<IListItem>;
  public listTitle: string;
  public columns: any[];
  public displayedColumns: string[];
  public pageSizeOptions: number[] = [];
  public dataSource: MatTableDataSource<IListItem> = new MatTableDataSource<IListItem>();
  @Input() public listId: string;
  @Input() public viewFields: string;
  @Input() public defaultPageSize: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Initializes the Component based on Angular logic
   * @param listsService Lists Services is being automatically Injected
   */
  constructor(listsService: ListsService) {
    this.listsService = listsService;
  }

  /**
   * After the Angular View is initialized, fetch the data
   */
  public ngAfterViewInit(): void {
    this.viewFieldsArray = this.viewFields.split(',');
    this.pageSizeOptions = [this.defaultPageSize, this.defaultPageSize * 2, this.defaultPageSize * 5];

    // Assign the different pieces of the DataTable to the DataSource
    this.paginator.pageSize = this.defaultPageSize;
    this.paginator.pageSizeOptions = this.pageSizeOptions;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // If there is a list specified
    if(this.listId) {
      // Gets the list based on the list specified
      this.listsService.getList(this.listId).then((list: any) => {
        this.listFields = list.Fields;
        this.listTitle = list.Title;
        this.buildColumns();
      }).then(() => {
        // Fetches the List Items from the list
        this.listsService.getListItems(this.listId, this.viewFieldsArray).then((items: any[]) => {
          this.sortedItems = items;
          this.itemsCount = this.sortedItems.length;
          this.sortItems({ active: "Title", direction: "asc"});
          this.loading = false;
        });
      });
    }
  }

  /**
   * Filters the content of the items Array based on the user input
   * @param filterValue The value to filter on
   */
  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  /**
   * Sorts the items Array based on column selected and direction
   * @param sort The Sort Information object (column and direction)
   */
  public sortItems(sort: Sort) {
    let self = this;
    const data = this.sortedItems.slice();
    if (!sort.active || sort.direction == '') {
      return;
    }

    // Simple sort based on the items Array data
    this.sortedItems = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      return self.compare(a[sort.active], b[sort.active], isAsc);
    });

    // Update the DataSource data using the updated sorted Array
    this.dataSource.data = this.sortedItems;
  }


  /**
   * Builds the dynamic list of columns to use in the DataTable
   */
  private buildColumns() {
    this.columns = [];

    // Loops through every ViewFields requested and builds the list of columns to display
    this.viewFieldsArray.forEach((viewField, index) => {
      // Finds the mathing column from the list fields
      let field = find(this.listFields, (listField) => { return viewField == listField.InternalName });

      // If the column has the field, add the column, else, skip it
      if(field) {
        this.columns.push({
          columnDef: field.InternalName,
          header: field.Title,
          cell: (row: any) => `${row[field.InternalName]}`
        })
      }
    });

    // Assign the Displayed Columns to the generated Columns Array
    this.displayedColumns = this.columns.map(x => x.columnDef);
  }

  /**
   * Simple compare method
   * @param a First Object to compare
   * @param b Second Object to compare
   * @param isAsc Direction of comparison
   */
  private compare(a, b, isAsc): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
