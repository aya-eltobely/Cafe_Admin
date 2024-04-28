import { Component } from '@angular/core';
import { MatDialogRef ,  MatDialogActions} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-delete',
  standalone: true,
  imports: [MatButtonModule,  MatDialogActions],
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.scss'
})
export class ProductDeleteComponent {

  
  constructor(public dialogRef: MatDialogRef<ProductDeleteComponent>) {
  }

  onDeleteData(){
    this.dialogRef.close(true)
  }

  onClose(){
    this.dialogRef.close(false)
  }


}
