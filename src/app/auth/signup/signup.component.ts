import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription, Observable } from 'rxjs';
import { UIService } from 'src/app/shares/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public maxDate;
  public isLoading$: Observable<boolean>;
  public loadingSub: Subscription;

  constructor(private authService: AuthService, private uiService: UIService, private store: Store<{ui: fromRoot.State}>) { }

  ngOnInit() {

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    const currentDate = new Date().getFullYear();
    this.maxDate = new Date(currentDate - 18, 0, 0);
  }

  onSubmit(form: NgForm) {

    console.log(form);
    this.authService.registerUser(form.value);
  }
}
