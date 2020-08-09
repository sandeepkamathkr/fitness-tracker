import {AuthData} from "./auth-data.model";
import {Subject} from 'rxjs-compat/Subject';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth"
import {TrainingService} from "../training/training.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private snackbar: MatSnackBar) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
        this.trainingService.cancelSubscription();
      }
    });
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
      })
      .catch(error => {
        this.snackbar.open(error.message, null,{
          duration: 3000
        })
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.snackbar.open("Successfully Authenticated",null,{
          politeness: "polite",
          duration: 2000
        })
      }).catch(error => {
        this.snackbar.open(error.message, null,{
          duration: 3000
        })
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }


  isAuth() {
    return this.isAuthenticated;
  }

}
