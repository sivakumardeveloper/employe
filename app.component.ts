import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from 'src/services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DialogRef } from '@angular/cdk/dialog';
import { CoreService } from './core/core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  displayedColumns: string[] = [
      'id',
     'firstName',
     'lastName',
     'email',
     'dob',
     'gender',
     'education',
     'company',
     'experience',
     'package',
     'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  title = 'crud';
  dialogRef: any;


  ngOnInit(): void {
    this.getEmployeeList();
  };
 

  constructor(private dialog:MatDialog ,private empService:EmployeeService,
    private CoreService:CoreService
  ){}
     

  openAddEditEmpForm(){
    const DialogRef=this.dialog.open(EmpAddEditComponent);
    this.dialogRef.afterClosed().subscribe({
      next:(val:any)=>{
        if (val){
          this.getEmployeeList();
        }
      }
    });
  };


  getEmployeeList(){
    this.empService.getEmployeeList().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error:console.log,
    });
      
      
    }
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    };
    deleteEmployee(id:number){
      this.empService.deleteEmployee(id).subscribe({
        next:(res)=>{
          this.CoreService.openSnackBar('Employee deleted!','done');
          this.getEmployeeList();
          alert('Employee deleted!');
          
        },
        error:console.log,
      });
    }
    
    
  openEditForm(){
     this.dialog.open(EmpAddEditComponent ,{
      
    });

    this.dialogRef.afterClosed().subscribe({
      next:(val:any)=>{
        if (val){
          this.getEmployeeList();
        }
      }
    });
  };
}

