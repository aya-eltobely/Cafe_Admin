import { Component } from '@angular/core';
import { MatDialogRef ,  MatDialogActions} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-approve',
  standalone: true,
  imports: [MatButtonModule,  MatDialogActions],
  templateUrl: './order-approve.component.html',
  styleUrl: './order-approve.component.scss'
})
export class OrderApproveComponent {

  constructor(public dialogRef: MatDialogRef<OrderApproveComponent>) {
  }

  onApprove(){
    this.dialogRef.close(true)
  }

  onClose(){
    this.dialogRef.close(false)
  }

}
