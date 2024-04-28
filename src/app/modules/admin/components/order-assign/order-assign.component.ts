import { Component, OnInit } from '@angular/core';
import { MatDialogRef ,  MatDialogActions} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DeliveryService } from '../../../../core/services/delivery.service';
import { Delivery } from '../../../../shared/Models/delivery';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-assign',
  standalone: true,
  imports: [MatButtonModule,  MatDialogActions,MatFormFieldModule, MatInputModule, MatSelectModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './order-assign.component.html',
  styleUrl: './order-assign.component.scss'
})
export class OrderAssignComponent implements OnInit{

  allDelivery!:Delivery[];
  selectedDeliveryForm!:FormGroup;


  constructor(public dialogRef: MatDialogRef<OrderAssignComponent> , private deliveryService:DeliveryService,private FB:FormBuilder) {
  }

  ngOnInit(): void {
    this.iatializeDeliveryForm()
    
    this.getAllDelivery()


  }

  getAllDelivery()
  {
    this.deliveryService.getAllDelivery().subscribe( (res:any) => 
    {
      console.log(res);
      this.allDelivery = res;
    } )
  }

  iatializeDeliveryForm()
  {
    this.selectedDeliveryForm = this.FB.group(
      {
        deliveryId : [null , Validators.required]
      }
    )
  }
  onAssign()
  {
    if(this.selectedDeliveryForm.invalid)
    {
      this.selectedDeliveryForm.markAllAsTouched()  
    }     
    else
    {
      // console.log(this.selectedDeliveryForm.value);
      this.dialogRef.close(this.selectedDeliveryForm.get('deliveryId')?.value);
    }
      
    
  }

  onClose(){
    this.dialogRef.close(false)
  }

}
