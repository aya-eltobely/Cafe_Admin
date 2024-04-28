import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogRef ,  MatDialogActions,
  MatDialogContent,MatDialogTitle } from '@angular/material/dialog';



@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,FormsModule,MatButtonModule,MatDialogActions,MatDialogContent,MatDialogTitle],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.scss'
})
export class CategoryAddComponent {

  productName!:string;

  constructor(public dialogRef: MatDialogRef<CategoryAddComponent>) {    
  }


  onAddData()
  {    
    this.dialogRef.close(this.productName);
  }


  onClose()
  {
    this.dialogRef.close()
  }




}
