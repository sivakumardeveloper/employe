import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/services/employee.service';
import { CoreService } from '../core/core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent  implements OnInit{

empForm!:FormGroup

constructor(private fb:FormBuilder, private empService:EmployeeService ,private dialogRef:MatDialogRef<EmpAddEditComponent>,
  @Inject(MAT_DIALOG_DATA)public data:any,private coreService:CoreService
){
  this.empForm=this.fb.group({
    firstName:'',
    lastName:'',
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    experience:'',
    package:'',
  });
};
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

education:string[]=[
  'Matric',
  'Diploma',
  'Intermediate',
  'Graduate',
  'Post Graduate',
]

onFormSubmit() {
  if(this.empForm.valid){
    if(this.data){
      this.empService.updateEmployee(this.data.id ,this.empForm.value).subscribe({
        next:(val:any)=>{
          this.coreService.openSnackBar('Employee detail Updated')
          alert('Employee detail Updated!');
          this.dialogRef.close(true);
        },
        error:(err:any)=>{
          console.error(err)
        },
       });

    }else{
      this.empService.addEmployee(this.empForm.value).subscribe({
        next:(val:any)=>{
          alert('Employee added Successfully');
          this.coreService.openSnackBar('Employee added Successfully');
          this.dialogRef.close(true);
        },
        error:(err:any)=>{
          console.error(err)
        },
       });
    
    }

         
  }
  }
}
