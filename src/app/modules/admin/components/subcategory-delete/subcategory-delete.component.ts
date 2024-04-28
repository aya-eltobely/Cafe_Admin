import { Component } from '@angular/core';
import { MatDialogRef ,  MatDialogActions} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-subcategory-delete',
  standalone: true,
  imports: [MatButtonModule,  MatDialogActions],
  templateUrl: './subcategory-delete.component.html',
  styleUrl: './subcategory-delete.component.scss'
})
export class SubcategoryDeleteComponent {

  constructor(public dialogRef: MatDialogRef<SubcategoryDeleteComponent>) {
  }

  onDeleteData(){
    this.dialogRef.close(true)
  }

  onClose(){
    this.dialogRef.close(false)
  }

}
