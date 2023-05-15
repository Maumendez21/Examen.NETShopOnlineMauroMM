import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './Pages/pages.routing';
import { AuthRoutingModule } from './Auth/auth.routing';
// import { AuthRoutingModule } from './Auth/auth.routing';
// import { PagesRoutingModule } from './Pages/pages.routing';
// import { PagesRoutingModule } from './Pages/pages.routing';
// import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [
  { path: '', redirectTo: '/shop/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/shop/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
