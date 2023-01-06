import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular13CRUD';
  displayedColumns: string[] = ['productName', 'category', 'price', 'comment', 'date', 'condition', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {

  }

  ngOnInit() {
    this.getAllProducts();
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllProducts()
      }
    })

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  getAllProducts() {
    return this.api.getProduct()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Something went wrong, Please try again later");
        }
      })
  }

  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: '50%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllProducts();
      }
    })
  }

  deleteProduct(id:number) {
    this.api.deleteProduct(id)
      .subscribe({
        next: (res) => {
          alert("Product has been deleted.");
          this.getAllProducts();
        },
        error: () => {
          alert("Something went wrong, Please try again");
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
