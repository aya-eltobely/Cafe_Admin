import { Component, Inject } from '@angular/core';
import { MatDialogRef ,  MatDialogActions, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-user-deactivate',
  standalone: true,
  imports: [MatButtonModule,  MatDialogActions],
  templateUrl: './user-deactivate.component.html',
  styleUrl: './user-deactivate.component.scss'
})
export class UserDeactivateComponent {

  constructor(public dialogRef: MatDialogRef<UserDeactivateComponent> ,  @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    
  }

  onDeactivate(){
    this.dialogRef.close(true)
  }

  onClose(){
    this.dialogRef.close(false)
  }


}
