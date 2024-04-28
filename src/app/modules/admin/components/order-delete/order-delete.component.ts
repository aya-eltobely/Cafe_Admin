import { Component } from '@angular/core';
import { MatDialogRef ,  MatDialogActions} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-order-delete',
  standalone: true,
  imports: [MatButtonModule,MatDialogActions],
  templateUrl: './order-delete.component.html',
  styleUrl: './order-delete.component.scss'
})
export class OrderDeleteComponent {
  constructor(public dialogRef: MatDialogRef<OrderDeleteComponent>) {
  }

  onDelete(){
    this.dialogRef.close(true)
  }

  onClose(){
    this.dialogRef.close(false)
  }

}
