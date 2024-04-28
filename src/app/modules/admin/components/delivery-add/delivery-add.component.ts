import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogRef ,  MatDialogActions,
  MatDialogContent,MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-delivery-add',
  standalone: true,
  imports: [MatIconModule,MatInputModule,MatFormFieldModule,FormsModule,MatButtonModule,MatDialogActions,MatDialogContent,MatDialogTitle,ReactiveFormsModule],
  templateUrl: './delivery-add.component.html',
  styleUrl: './delivery-add.component.scss'
})
export class DeliveryAddComponent implements OnInit {

  deliveryForm!:FormGroup;
  hidePass = true;
  hideConfirmPass = true;

  constructor(public dialogRef: MatDialogRef<DeliveryAddComponent>, private FB:FormBuilder) {    
  }

  ngOnInit(): void {
    this.inatilizeDeliveryForm();
  }

  inatilizeDeliveryForm()
  {
    this.deliveryForm = this.FB.group(
      {
        firstName:  [null,Validators.required],
        lastName:   [null,Validators.required],
        userName:   [null,Validators.required],
        email:      [null, [Validators.required , this.emailValidation() ]],
        phoneNumber:[null,[Validators.required]],
        password:   [null, [Validators.required , Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")] ],
        confirmPassword:[null,[Validators.required , Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      },
      { validators : [this.ConfirmPassFn() ] }
    )

  }


  emailValidation():ValidatorFn
  {
    return ( (control:AbstractControl) : ValidationErrors | null =>
    {
      
      let email = control.value;
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailPattern.test(email)) {
        return { invalidEmail: true };
      }
      else 
      {
        return null;
      } 

    } )

  }

  ConfirmPassFn():ValidatorFn
  {
    return ( (control:AbstractControl) : ValidationErrors | null =>
    {
      let pass = control.get('password')?.value;
      let confirmPass = control.get('confirmPassword')?.value;

      if(pass != confirmPass)
      {
        return { isNotMatch : true }
      }
      else
      {
        return null;
      }
    } )

  }

  onAddDelivery()
  {
    if(this.deliveryForm.invalid)
    {
      this.deliveryForm.markAllAsTouched() 
    }     
    else
    {
      console.log(this.deliveryForm.value);
      
      this.dialogRef.close(this.deliveryForm.value);
    }
    
  }


  onClose()
  {
    this.dialogRef.close()
  }


}
