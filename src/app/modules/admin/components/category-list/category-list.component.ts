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


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatButtonModule,MatIconModule,MatMenuModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements AfterViewInit,OnInit {


  allcat!:Category[];
  displayedColumns: string[] = ['id', 'name','actions'];

  dataSource = new MatTableDataSource<Category>(this.allcat);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private catService:CategoryService , private dialog: MatDialog,private toastr:ToastrService) {
  }


  ngOnInit(): void {
    this.getcategorylist()
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getcategorylist()
  {
    this.catService.getallcategory().subscribe((res:any)=>
    {
      this.dataSource.data=res; 
    })
  }

  onAddCategory()
  {
    const dialogRef = this.dialog.open( CategoryAddComponent , {
    } );

    dialogRef.afterClosed().subscribe( (res)=>
    {
      //add data to db
      let cat:Category = {name:res}
      
      if(res)
      {
        this.catService.addcategory(cat).subscribe( (res:any) => 
        {
          this.toastr.success(res.message)
          this.getcategorylist()
        } )
      }
    } )
  }

  onEditCategory(id:number,category: Category): void {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: category, // Pass the category data to the dialog
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let cat:Category = {name:res}
        // Update the category or perform any necessary action after editing
        this.catService.editcategory(id,cat).subscribe( (res:any) => 
        {
          this.toastr.success(res.message)
          this.getcategorylist()
        } )
      }
    });
  }


  onDeleteCategory(id: number): void {
    const dialogRef = this.dialog.open(CategoryDeleteComponent, {
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        //Delete Data from db
        this.catService.deletecategory(id).subscribe( (res:any) => 
        {
          this.toastr.success(res.message)
          this.getcategorylist()
        } )
      }
    });
  }

  // viewCategory(categoryId: number): void {
  //   const dialogRef = this.dialog.open(HomeComponent, {
  //     data: categoryId, // Pass the category ID to the dialog
  //   });
  // }


 

















}


