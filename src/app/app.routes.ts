import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./modules/login/login.component').then((x) => x.LoginComponent),
        title: 'LogIn'
    }
    ,
    {
        path: '',
        loadComponent: () => import('./modules/admin/components/home/home.component').then((x) => x.HomeComponent),
        title: 'Home',
        canActivate: [authGuard]
    },
    {
        path: 'categorylist',
        loadComponent: () => import('./modules/admin/components/category-list/category-list.component').then((x) => x.CategoryListComponent),
        title: 'Category',
        canActivate: [authGuard]

        // children : [
        //     {
        //         path:'',
        //         loadComponent: () => import('./modules/admin/components/category-list/category-list.component').then((x) => x.CategoryListComponent),
        //         title: 'All Category',
        //     },
        //     // {
        //     //     path:'childTwo',
        //     //     loadComponent: () => import('./home/child2/child2.component').then((x) => x.Child2Component),
        //     //     title: 'childTwo',
        //     // }
        // ],
        

    },
    {
        path: 'subcategorylist',
        loadComponent: () => import('./modules/admin/components/subcategory-list/subcategory-list.component').then((x) => x.SubcategoryListComponent),
        title: 'SubCategory',
        canActivate: [authGuard]
    },
    {
        path: 'delivery',
        loadComponent: () => import('./modules/admin/components/delivery-list/delivery-list.component').then((x) => x.DeliveryListComponent),
        title: 'Delivery',
        canActivate: [authGuard]
    },
    {
        path: 'user',
        loadComponent: () => import('./modules/admin/components/user-list/user-list.component').then((x) => x.UserListComponent),
        title: 'User',
        canActivate: [authGuard]
    },
    {
        path: 'product',
        loadComponent: () => import('./modules/admin/components/product-list/product-list.component').then((x) => x.ProductListComponent),
        title: 'Product',
        canActivate: [authGuard]
    },
    {
        path: 'order',
        loadComponent: () => import('./modules/admin/components/order-list/order-list.component').then((x) => x.OrderListComponent),
        title: 'Order',
        canActivate: [authGuard]
    },
];
