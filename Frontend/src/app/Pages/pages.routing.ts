import { Routes, RouterModule, CanLoad } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ShopsComponent } from './shops/shops.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from '../Guards/auth.guard';
import { AdminGuard } from '../Guards/admin.guard';


const routes: Routes = [
    { 
        path: 'shop', 
        component: PagesComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
                
            },
            { path: '', redirectTo: 'shop/home', pathMatch: 'full' },
        ],
        
    },
    { 
        path: 'admin', 
        component: PagesComponent,
        children: [
            {
                path: 'shops',
                component: ShopsComponent,
                canActivate: [AuthGuard],
                
            },
            {
                path: 'products',
                component: ProductsComponent,
                canActivate: [AuthGuard]
            },
            { path: '', redirectTo: 'shop/home', pathMatch: 'full' },
        ],
        
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
