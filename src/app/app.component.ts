import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from './data.service';
import { timer } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UserData {userId: number; id: number; title: string;}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  apiData: any;
  displayedColumns: string[] = ['userId', 'id', 'title'];
  dataSource: MatTableDataSource<any>;
  constructor(private service: DataService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getData();
  }


 
  getData() {
    timer(0, 10000) //poll for new post from API in every 10 seconds
      .pipe(concatMap(() => this.service.getDetails())
      ).subscribe((resp) => {
        console.log("Details", resp);
        this.apiData = resp;
        this.dataSource = new MatTableDataSource(this.apiData);        
      });
  }

 setupFilter(column: string) {
    //let apiData = this.apiData;
    this.dataSource.filterPredicate = (d: UserData, filter: string) => {
      const textToSearch = d[column] && d[column].toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  
  searchFilter(filterValue: string) {
    this.setupFilter('title')
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  modal(row) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: row
    });
    console.log(row);
   }
}
export interface User {
  userId: string;
  id: string;
  title: string;
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}