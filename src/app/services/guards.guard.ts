import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  
  constructor( private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (localStorage.getItem('user_type') === 'user' ) {
        
        this.router.navigateByUrl('/Home/Dates/AllDates'); 
        
        return true;
      
      } else if (localStorage.getItem('user_type') === 'admin'){
        this.router.navigateByUrl('/Home'); 
        return true;
      }
      return false
  }
  
}
