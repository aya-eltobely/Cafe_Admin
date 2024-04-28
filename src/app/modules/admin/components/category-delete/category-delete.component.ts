import { Component } from '@angular/core';
import { MatDialogRef ,  MatDialogActions} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-category-delete',
  standalone: true,
  imports: [MatButtonModule,  MatDialogActions],
  templateUrl: './category-delete.component.html',
  styleUrl: './category-delete.component.scss'
})
export class CategoryDeleteComponent {

  constructor(public dialogRef: MatDialogRef<CategoryDeleteComponent>) {
  }

  onDeleteData(){
    this.dialogRef.close(true)
  }

  onClose(){
    this.dialogRef.close(false)
  }


}
