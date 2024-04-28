import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,  MatDialogActions,
  MatDialogContent,MatDialogTitle  } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';




@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,FormsModule,MatButtonModule,  MatDialogActions,
    MatDialogContent,MatDialogTitle],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent {


  constructor(public dialogRef: MatDialogRef<CategoryEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onEditData(){
    this.dialogRef.close(this.data.name)
  }

  onClose(){
    this.dialogRef.close()
  }

}
