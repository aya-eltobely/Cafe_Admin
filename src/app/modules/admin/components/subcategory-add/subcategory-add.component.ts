import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogRef ,  MatDialogActions,
  MatDialogContent,MatDialogTitle } from '@angular/material/dialog';
  import {MatSelectModule} from '@angular/material/select';
  import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../shared/Models/category';


@Component({
  selector: 'app-subcategory-add',
  standalone: true,
  imports: [CommonModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatDialogActions,MatDialogContent,MatDialogTitle,MatSelectModule,MatIconModule,FormsModule,ReactiveFormsModule],
  templateUrl: './subcategory-add.component.html',
  styleUrl: './subcategory-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush // this make angular not check about any change on any component except
})
export class SubcategoryAddComponent implements OnInit {

  productName!:string;
  selectedFile: File | null = null;
  addSubCategoryForm!:FormGroup;
  previewImg:any;

  isImageError =signal<boolean>(false);

  allCateggory = signal<Category[]>([]);

  
  
  constructor(public dialogRef: MatDialogRef<SubcategoryAddComponent>,private FB:FormBuilder,private categoryservice:CategoryService) {    
  }
  ngOnInit(): void {
    this.inatializeSbCategoryForm();
    this.getAllCategory()
    
  }

  inatializeSbCategoryForm()
  {
    this.addSubCategoryForm =  this.FB.group( {
      name: [ null , Validators.required  ],
      categoryId: [ null , Validators.required  ],
      contentType : [null , Validators.required],
      fileName : [null , Validators.required],
      imageData : [null , Validators.required],
    } )
  }

  onAddData()
  {
    if(this.addSubCategoryForm.invalid)
    {
      this.addSubCategoryForm.markAllAsTouched()
      
    }     
    else
    {
      this.dialogRef.close(this.addSubCategoryForm.value);
    }
          
  }


  onClose()
  {
    this.dialogRef.close()
  }


  onFileSelected(event: any): void {
   
    const reader = new FileReader();
  
    this.selectedFile = event.target.files[0] as File;
  
    reader.onload = () => {
      const contentData = reader.result?.toString().split(',')[1];
  
      this.addSubCategoryForm.patchValue({
        imageData: contentData,
        fileName: this.selectedFile?.name,
        contentType: this.selectedFile?.type
      });

      this.isImageError.set(false);
  
      this.previewImg = reader.result;
    };
  
    reader.readAsDataURL(this.selectedFile);
  }
  
  getAllCategory()
  {
    this.categoryservice.getallcategory().subscribe( (res:any) => 
    {
      this.allCateggory.set(res);
    } )
  }


  



}
