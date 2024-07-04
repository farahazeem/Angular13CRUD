import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Form, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  conditionList = ['Brand New', 'Second Hand', 'Refurbished'];
  productForm! : FormGroup
  actionBtn : string = 'Save';
  title : string = 'Add';
  constructor(private formBuilder: FormBuilder, private api: ApiService, @Inject(MAT_DIALOG_DATA) public editData : any, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      condition: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    })

    if(this.editData){
      this.title = 'Edit';
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['condition'].setValue(this.editData.condition);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct() {
    if(!this.editData) {
      if (this.productForm.valid){
        console.log("coming here",this.productForm.value);
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res) => {
            alert("Product has been added");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:()=> {
            alert("Error while adding the product");
          }
        })
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.updateProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next:(res) => {
        alert("Product has been updated");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:() => {
        alert("Error while updating the record");
      }
    })
  }

}
