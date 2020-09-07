import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();
  public authSubscription: Subscription;
  public isAuth$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>, private authService: AuthService) { }

  ngOnInit() {

    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    console.log(this.isAuth$);
  }

  onToggleSidenav() {

    this.sidenavToggle.emit();
  }

  onLogout() {

    this.authService.logout();
  }

}
