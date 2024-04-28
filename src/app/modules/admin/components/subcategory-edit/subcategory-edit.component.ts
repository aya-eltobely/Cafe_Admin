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


@Component({
  selector: 'app-subcategory-edit',
  standalone: true,
  imports: [CommonModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatDialogActions,MatDialogContent,MatDialogTitle,MatSelectModule,MatIconModule,FormsModule,ReactiveFormsModule],
  templateUrl: './subcategory-edit.component.html',
  styleUrl: './subcategory-edit.component.scss'
})
export class SubcategoryEditComponent implements OnInit {

  subcategoryEditForm!:FormGroup;
  allCateggory!:Category[];
  selectedFile: File | null = null;
  previewImg:any;
  isImageError :boolean= false;
  selectedCategory!:any;

  constructor(public dialogRef: MatDialogRef<SubcategoryEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private FB:FormBuilder,private categoryservice:CategoryService) {  
  }


  ngOnInit(): void {

    this.intializeEditForm(this.data);
    this.getAllCategory()
    this.selectedCategory = this.data['categoryName'];
    console.log( this.data);
  }

  
  intializeEditForm(data:SubCategory)
  {
    this.subcategoryEditForm = this.FB.group({
      name:[data.name||null , Validators.required],
      categoryId:[data.categoryId||null, Validators.required],
      fileName:[ data.fileName||null , Validators.required],
      imageData:[ data.imageData||null, Validators.required ],
      contentType:[ data.contentType||null, Validators.required ],
    })
  }

  


  getAllCategory()
  {
    this.categoryservice.getallcategory().subscribe( (res:any) => 
    {
      this.allCateggory = res;
    } )
  }
  

  onFileSelected(event: any): void {
   
    const reader = new FileReader();
  
    this.selectedFile = event.target.files[0] as File;
  
    reader.onload = () => {
      const contentData = reader.result?.toString().split(',')[1];
  
      this.subcategoryEditForm.patchValue({
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
    if(this.subcategoryEditForm.invalid)
    {
      this.subcategoryEditForm.markAllAsTouched()
    } 
    else
    {
      this.dialogRef.close(this.subcategoryEditForm.value);
    }
  }
  
  onClose()
  {
    this.dialogRef.close()
  }









}
