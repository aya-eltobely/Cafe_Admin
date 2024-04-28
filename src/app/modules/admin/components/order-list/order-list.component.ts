import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../../shared/Models/product';
import { ProductService } from '../../../../core/services/product.service';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Order } from '../../../../shared/Models/order';
import { OrderService } from '../../../../core/services/order.service';
import { OrderRejectComponent } from '../order-reject/order-reject.component';
import { OrderApproveComponent } from '../order-approve/order-approve.component';
import { OrderAssignComponent } from '../order-assign/order-assign.component';
import { OrderDeleteComponent } from '../order-delete/order-delete.component';
import { CommonModule } from '@angular/common';
import { EgyCurrencyPipe } from '../../../../shared/pipes/egy-currency.pipe';
import {MatChipsModule} from '@angular/material/chips';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [MatAccordion,MatExpansionModule,MatChipsModule,EgyCurrencyPipe,CommonModule,MatPaginatorModule,MatTableModule,MatButtonModule,MatIconModule,MatMenuModule,MatFormFieldModule,FormsModule,ReactiveFormsModule,MatInputModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
  animations: [
    trigger('collapseExpand', [
      state('collapsed', style({
        height: '0',
      })),
      state('expanded', style({
        height: '*',
      })),
      transition('collapsed <=> expanded', animate('400ms ease-in')),
    ]),
  ],
})
export class OrderListComponent  implements OnInit, AfterViewInit {

  
  allOrder!:Order[];
  state : string='collapsed'

  displayedColumns: string[] = ['id','userFullName','date','orderTotals','address','status','deliveryStatus','assignto','actions'];

  dataSource = new MatTableDataSource<Order>(this.allOrder);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderService:OrderService,private dialog: MatDialog,private toastr:ToastrService) {
  }

  ngOnInit(): void {
    this.getAllOrder()
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  getAllOrder()
  {
    this.orderService.getAllOrder().subscribe( (res:any) => 
      {
        this.dataSource.data=res
      })

  }

  onReject(id:number)
  {
    const dialogRef = this.dialog.open(OrderRejectComponent, {
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
      
        this.orderService.rejectOrder(id).subscribe( (res:any) => 
        {
          this.toastr.success(res.message)
          this.getAllOrder()
        } )
      }
    });

  }

  onApprove(id:number)
  {
    const dialogRef = this.dialog.open(OrderApproveComponent, {
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        
        this.orderService.approveOrder(id).subscribe( (res:any) => 
        {
          this.toastr.success(res.message)
          this.getAllOrder()
        } )
      }
    });

  }

  onAssignToDelivery(id:number)
  {
    const dialogRef = this.dialog.open(OrderAssignComponent, {
      data:id
    });

    dialogRef.afterClosed().subscribe((res) => { //res => deliveryId
      if (res) {
        
        this.orderService.assignOrder(id,res).subscribe( (res:any) => 
        {
          this.toastr.success(res.message)
          this.getAllOrder()
        } )
      }
    });

  }

  onDelete(id: number): void
  {

    const dialogRef = this.dialog.open(OrderDeleteComponent, {
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.orderService.deleteOrder(id).subscribe( (res:any) => 
        {
          this.toastr.success(res.message)
          this.getAllOrder()
        } )
      }
    });

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  toggle()
  {
    // this.isCollapsed = ! this.isCollapsed;
    this.state = (this.state === 'collapsed' ? 'expanded' : 'collapsed' );
  }

}
