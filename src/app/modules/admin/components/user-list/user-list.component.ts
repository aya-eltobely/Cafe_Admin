import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../shared/Models/user';
import { UserService } from '../../../../core/services/user.service';
import { UserDeactivateComponent } from '../user-deactivate/user-deactivate.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { animate, state, style, transition, trigger } from '@angular/animations';
 

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatAccordion,MatExpansionModule,MatPaginatorModule, MatTableModule, MatButtonModule, MatIconModule, MatMenuModule,MatFormFieldModule,FormsModule,ReactiveFormsModule,MatInputModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
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
export class UserListComponent implements OnInit, AfterViewInit {



  allUsers!: User[];
  state : string='collapsed' 

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'userName', 'email', 'activate','actions'];

  dataSource = new MatTableDataSource<User>(this.allUsers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private dialog: MatDialog, private toastr: ToastrService) {
  }


  ngOnInit(): void {
    this.getUserList()
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getUserList() {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.dataSource.data = res;
    })
  }


  onDeactivate(user: User) {

    const dialogRef = this.dialog.open(UserDeactivateComponent, {
      data:user
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        //Delete Data from db
        this.userService.deactivateUser(user.userId).subscribe((res: any) => {
          this.toastr.success(res.message)
          this.getUserList()
        })
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggle()
  {
    // this.isCollapsed = ! this.isCollapsed;
    this.state = (this.state === 'collapsed' ? 'expanded' : 'collapsed' );
  }



}
