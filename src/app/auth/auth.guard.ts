import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private store: Store<fromRoot.State>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.store.select(fromRoot.getIsAuth)) {

      return true;
    }
    else {

      this.router.navigate(['/login']);
    }
  }
}
