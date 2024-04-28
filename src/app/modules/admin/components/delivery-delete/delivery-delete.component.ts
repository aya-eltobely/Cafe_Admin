import { Component } from '@angular/core';
import { MatDialogRef ,  MatDialogActions} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delivery-delete',
  standalone: true,
  imports: [MatButtonModule,  MatDialogActions],
  templateUrl: './delivery-delete.component.html',
  styleUrl: './delivery-delete.component.scss'
})
export class DeliveryDeleteComponent {

  constructor(public dialogRef: MatDialogRef<DeliveryDeleteComponent>) {
  }

  onDeleteData(){
    this.dialogRef.close(true)
  }

  onClose(){
    this.dialogRef.close(false)
  }


}
