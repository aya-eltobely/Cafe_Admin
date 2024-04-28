import { Component } from '@angular/core';
import { MatDialogRef ,  MatDialogActions} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-reject',
  standalone: true,
  imports: [MatButtonModule,  MatDialogActions],
  templateUrl: './order-reject.component.html',
  styleUrl: './order-reject.component.scss'
})
export class OrderRejectComponent {

  constructor(public dialogRef: MatDialogRef<OrderRejectComponent>) {
  }

  onReject(){
    this.dialogRef.close(true)
  }

  onClose(){
    this.dialogRef.close(false)
  }

}
