import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {UIService} from "../../shared/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  loginForm: FormGroup;
  isLoading: boolean = false;
  private loadingSub : Subscription;

  constructor(private authService: AuthService,
              private uiService: UIService) {
  }

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    })
  }

  onSubmit(): void {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }
}
