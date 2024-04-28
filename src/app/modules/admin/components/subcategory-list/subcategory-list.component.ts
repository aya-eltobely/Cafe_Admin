import { SubCategory } from './../../../../shared/Models/sub-category';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { SubcategoryService } from '../../../../core/services/subcategory.service';
import { SubcategoryAddComponent } from '../subcategory-add/subcategory-add.component';
import { SubcategoryEditComponent } from '../subcategory-edit/subcategory-edit.component';
import { SubcategoryDeleteComponent } from '../subcategory-delete/subcategory-delete.component';

@Component({
  selector: 'app-subcategory-list',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatButtonModule,MatIconModule,MatMenuModule],
  templateUrl: './subcategory-list.component.html',
  styleUrl: './subcategory-list.component.scss'
})
export class SubcategoryListComponent implements OnInit, AfterViewInit {

  allSubCategory!:SubCategory[];

  displayedColumns: string[] = ['id','img', 'name','CategoryName','actions'];

  dataSource = new MatTableDataSource<SubCategory>(this.allSubCategory);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private subcategoryservice:SubcategoryService,private dialog: MatDialog,private toastr:ToastrService) {
  }

  ngOnInit(): void {
    this.getAllSubcategory()
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  getAllSubcategory()
  {
    this.subcategoryservice.getallsubcategory().subscribe( (res:any) => 
      {
        console.log(res);
        
        this.dataSource.data=res
      })

  }

  onAddSubcategory()
  {
    const dialogRef = this.dialog.open( SubcategoryAddComponent , {
    } );

    dialogRef.afterClosed().subscribe( (res)=>
    {  
      if(res)
      {
        this.subcategoryservice.addsubcategory(res).subscribe( (res:any) => 
        {
          this.toastr.success(res.message)
          this.getAllSubcategory()
        } )
      }
    } )

  }

  onEditSubcategory(id:number,subcategory: SubCategory): void 
  {
    const dialogRef = this.dialog.open( SubcategoryEditComponent , {
      data: subcategory
    } );

    dialogRef.afterClosed().subscribe( (res)=>
    {  
      if(res)
      {
        this.subcategoryservice.editsubcategory(id,res).subscribe( (res:any) => 
        {
          this.toastr.success(res.message)
          this.getAllSubcategory()
        } )
      }
    } )

  }

  onDeleteSubcategory(id: number): void
  {

    const dialogRef = this.dialog.open(SubcategoryDeleteComponent, {
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        //Delete Data from db
        this.subcategoryservice.deletesubcategory(id).subscribe( (res:any) => 
        {
          this.toastr.success(res.message)
          this.getAllSubcategory()
        } )
      }
    });

  }



}
