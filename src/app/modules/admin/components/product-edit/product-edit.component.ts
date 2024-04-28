import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogActions,
  MatDialogContent,MatDialogTitle } from '@angular/material/dialog';
  import {MatSelectModule} from '@angular/material/select';
  import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubCategory } from '../../../../shared/Models/sub-category';
import { Category } from '../../../../shared/Models/category';
import { CategoryService } from '../../../../core/services/category.service';
import { SubcategoryService } from '../../../../core/services/subcategory.service';
import { Product } from '../../../../shared/Models/product';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatDialogActions,MatDialogContent,MatDialogTitle,MatSelectModule,MatIconModule,FormsModule,ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit {


  
  productEditForm!:FormGroup;
  allSubcategory!:SubCategory[];
  selectedFile: File | null = null;
  previewImg:any;
  isImageError :boolean= false;

  constructor(public dialogRef: MatDialogRef<ProductEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private FB:FormBuilder,private subCategoryservice:SubcategoryService) {  
  }


  ngOnInit(): void {

    this.intializeEditForm(this.data);
    this.getAllSubCategory()
    console.log(this.data);
  }

  
  intializeEditForm(data:Product)
  {
    this.productEditForm = this.FB.group({
      price: [ data.price||null , [Validators.required]  ],
      description: [ data.description||null , Validators.required  ],
      subCategoryId: [ data.subCategoryId||null , Validators.required  ],
      name:[data.name||null , Validators.required],
      fileName:[ data.fileName||null , Validators.required],
      imageData:[ data.imageData||null, Validators.required ],
      contentType:[ data.contentType||null, Validators.required ],
    })
  }

  


  getAllSubCategory()
  {
    this.subCategoryservice.getallsubcategory().subscribe( (res:any) => 
    {
      this.allSubcategory = res;
    } )
  }
  

  onFileSelected(event: any): void {
   
    const reader = new FileReader();
  
    this.selectedFile = event.target.files[0] as File;
  
    reader.onload = () => {
      const contentData = reader.result?.toString().split(',')[1];
  
      this.productEditForm.patchValue({
        imageData: contentData,
        fileName: this.selectedFile?.name,
        contentType: this.selectedFile?.type
      });

      this.isImageError = false;
  
      this.previewImg = reader.result;
    };
  
    reader.readAsDataURL(this.selectedFile);
  }


  onEditData()
  { 
    if(this.productEditForm.invalid)
    {
      this.productEditForm.markAllAsTouched()
    } 
    else
    {
      this.dialogRef.close(this.productEditForm.value);
    }
  }
  
  onClose()
  {
    this.dialogRef.close()
  }








}
