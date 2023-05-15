import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {


  /**
   *
   */
  constructor(private authService: AuthService, private router: Router) {
    

  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.authService.token) {
      this.router.navigateByUrl('/shop/home');
      return false;
    }
    else {

      return true;
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {


      if (!this.authService.token) {
        this.router.navigateByUrl('/shop/home');
        return false;
      }
      else {

        return true;
      }


  }
  
}
