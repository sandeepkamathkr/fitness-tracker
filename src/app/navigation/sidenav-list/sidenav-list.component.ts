import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit,OnDestroy {
  @Output() sideNavClose: EventEmitter<void> = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubscription: Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => this.isAuth = authStatus);
  }

  onClose(): void {
    this.sideNavClose.emit();
  }

  onLogout(){
    this.onClose();
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
