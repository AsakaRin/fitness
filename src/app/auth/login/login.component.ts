import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shares/ui.service';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isLoading$: Observable<boolean>;
  public loadingSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<{ui: fromRoot.State}>,
  ) { }

  ngOnInit() {

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.loginForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  // ngOnDestroy() {

  //   if (this.loadingSub) {

  //     this.loadingSub.unsubscribe()
  //   }
  // }

  get f() { return this.loginForm.controls; }

  onSubmit() {

    // if (this.loginForm.invalid) {

    //   console.log('invalid')
    //   console.log(this.f);
    //   return;
    // }


    console.log(this.loginForm);
    this.authService.login(this.loginForm.value);
  }

}
