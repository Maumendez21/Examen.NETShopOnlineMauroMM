import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
    

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.authService.role !== 2 || 1) {
        this.router.navigateByUrl('/home')
        return false;
      }
      else {

        return true;
      }


      // switch (this.authService.role) {
      //   case 1:

      //     this.router.navigateByUrl('/admin/shops')
      //     return true;
      //   case 2:

      //     this.router.navigateByUrl('/admin/products')
      //     return true;
      //   case 3:
      //       this.router.navigateByUrl('/shop/home')
      //       return false;
      //   default:
      //     return false;
      // }

  }
  
}
