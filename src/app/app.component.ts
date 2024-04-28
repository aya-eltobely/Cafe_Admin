import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatMenuModule,MatButtonModule,RouterOutlet,NavbarComponent,FooterComponent,CommonModule,MatSidenavModule,RouterLink,RouterLinkActive,MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  constructor(private router:Router) {
    
  }

  ngOnInit(): void {

  
  }

  isloggview!:any;
  isLoggedView()
  {
   this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
    this.isloggview = (event.url == '/login')  
    })
    return this.isloggview;
  }
  


}
