import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Observable} from "rxjs";
import * as fromRoot from '../../app.reducer';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sideNavClose: EventEmitter<void> = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose(): void {
    this.sideNavClose.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
