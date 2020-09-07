import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shares/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shares/ui.actions';
import * as Auth from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = new Subject<any>();
  private authChanged = false;

  constructor(
    private router: Router,
    private auf: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<{ui: fromRoot.State}>
  ) { }

  initAuthListener() {

    this.auf.authState.subscribe(user => {

      if (user) {

        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      }
      else {

        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login']);
        this.trainingService.cancelSubscription();
      }
    })
  }

  registerUser(authData: AuthData) {

    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.auf.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {

        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.openSnackBar(error, null, 3000);
      });
  }

  login(authData: AuthData) {

    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.auf.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {

        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.openSnackBar(error, null, 3000);
      });
  }

  logout() {

    this.auf.auth.signOut();
  }
}
