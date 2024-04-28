import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../shared/Models/category';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { ToastrService } from 'ngx-toastr';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';
import { Delivery } from '../../../../shared/Models/delivery';
import { DeliveryService } from '../../../../core/services/delivery.service';
import { DeliveryAddComponent } from '../delivery-add/delivery-add.component';
import { DeliveryDeleteComponent } from '../delivery-delete/delivery-delete.component';


@Component({
  selector: 'app-delivery-list',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatButtonModule,MatIconModule,MatMenuModule],
  templateUrl: './delivery-list.component.html',
  styleUrl: './delivery-list.component.scss'
})
export class DeliveryListComponent implements OnInit , AfterViewInit {


  alldelivery!:Delivery[];
  displayedColumns: string[] = ['id', 'firstName','lastName','userName','email','phoneNumber','actions'];

  dataSource = new MatTableDataSource<Delivery>(this.alldelivery);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private deliveryService:DeliveryService , private dialog: MatDialog,private toastr:ToastrService) {
  }


  ngOnInit(): void {
    this.getDeliveryList()
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getDeliveryList()
  {
    this.deliveryService.getAllDelivery().subscribe((res:any)=>
    {
      this.dataSource.data=res; 
    })
  }

  onAddDelivery()
  {
    const dialogRef = this.dialog.open( DeliveryAddComponent , {
      width: '50%'
    } );

    dialogRef.afterClosed().subscribe( (res)=>
    {
      //add data to db      
      if(res)
      {
        this.deliveryService.addDelivery(res).subscribe( (res:any) => 
        {
          this.toastr.success(res.message)
          this.getDeliveryList()
        } )
      }
    } )
  }

  onDeleteDelivery(id: number): void {
    const dialogRef = this.dialog.open(DeliveryDeleteComponent, {
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        //Delete Data from db
        console.log(id);
        
        // this.deliveryService.deleteDelivery(id).subscribe( (res:any) => 
        // {
        //   this.toastr.success(res.message)
        //   this.getDeliveryList()
        // } )
      }
    });
  }


}
