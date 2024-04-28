import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogRef ,  MatDialogActions,
  MatDialogContent,MatDialogTitle } from '@angular/material/dialog';
  import {MatSelectModule} from '@angular/material/select';
  import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { Product } from '../../../../shared/Models/product';
import { SubcategoryService } from '../../../../core/services/subcategory.service';


@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatDialogActions,MatDialogContent,MatDialogTitle,MatSelectModule,MatIconModule,FormsModule,ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush // this make angular not check about any change on any component except

})
export class ProductAddComponent implements OnInit{


  productName!:string;
  selectedFile: File | null = null;
  addProductForm!:FormGroup;
  previewImg:any;

  isImageError =signal<boolean>(false);

  allSubcategoryt = signal<Product[]>([]);

  
  
  constructor(public dialogRef: MatDialogRef<ProductAddComponent>,private FB:FormBuilder,private subcategoryService:SubcategoryService) {    
  }
  ngOnInit(): void {
    this.inatializeProductForm();
    this.getAllSubcategory()  
  }

  inatializeProductForm()
  {
    this.addProductForm =  this.FB.group( {
      name: [ null , Validators.required  ],
      price: [ null , [Validators.required]  ],
      description: [ null , Validators.required  ],
      subCategoryId: [ null , Validators.required  ],
      contentType : [null , Validators.required],
      fileName : [null , Validators.required],
      imageData : [null , Validators.required],
    } )
  }



  onAddData()
  {

    if(this.addProductForm.invalid)
    {     
      this.addProductForm.markAllAsTouched()  
    }     
    else
    {
      
      this.dialogRef.close(this.addProductForm.value);
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
  
      this.addProductForm.patchValue({
        imageData: contentData,
        fileName: this.selectedFile?.name,
        contentType: this.selectedFile?.type
      });

      this.isImageError.set(false);
  
      this.previewImg = reader.result;
    };
  
    reader.readAsDataURL(this.selectedFile);
  }
  
  getAllSubcategory()
  {
    this.subcategoryService.getallsubcategory().subscribe( (res:any) => 
    {
      this.allSubcategoryt.set(res);
    } )
  }


  


}
