import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule, MatMiniFabButton} from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../../shared/Models/product';
import { ProductService } from '../../../../core/services/product.service';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatAccordion,MatExpansionModule,MatPaginatorModule,MatTableModule,MatButtonModule,MatIconModule,MatMenuModule,MatFormFieldModule,FormsModule,ReactiveFormsModule,MatInputModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
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
export class ProductListComponent  implements OnInit, AfterViewInit{


  allProduct!:Product[];
  state : string='collapsed' 

  displayedColumns: string[] = ['id','img', 'name','price','description','subCategoryName','actions'];

  dataSource = new MatTableDataSource<Product>(this.allProduct);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService:ProductService,private dialog: MatDialog,private toastr:ToastrService) {
  }

  ngOnInit(): void {
    this.getAllProduct()
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  getAllProduct()
  {
    this.productService.getAllProduct().subscribe( (res:any) => 
      {
        this.dataSource.data=res
      })

  }

  onAddProduct()
  {
    const dialogRef = this.dialog.open( ProductAddComponent , {
      maxHeight:'90vh'

    } );

    dialogRef.afterClosed().subscribe( (res)=>
    {  
      if(res)
      {
        this.productService.addProduct(res).subscribe( (res:any) => 
        {
          this.toastr.success(res.message)
          this.getAllProduct()
        } )
      }
    } )

  }

  onEditProduct(id:number,prod: Product): void 
  {
    const dialogRef = this.dialog.open( ProductEditComponent , {
      data: prod
    } );

    dialogRef.afterClosed().subscribe( (res)=>
    {  
      if(res)
      {        
        this.productService.editProduct(id,res).subscribe( (res:any) => 
        {
          this.toastr.success(res.message)
          this.getAllProduct()
        } )
      }
    } )

  }

  onDeleteProduct(id: number): void
  {

    const dialogRef = this.dialog.open(ProductDeleteComponent, {
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        //Delete Data from db
        this.productService.deleteProduct(id).subscribe( (res:any) => 
        {
          this.toastr.success(res.message)
          this.getAllProduct()
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
