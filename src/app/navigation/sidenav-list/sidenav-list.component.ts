import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter<void>();
  isAuth$: Observable<boolean>

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onSidenavClose() {

    this.sidenavClose.emit();
  }

  onLogout() {

    this.authService.logout();
    this.onSidenavClose();
  }

}
