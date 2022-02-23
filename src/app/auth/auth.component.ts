import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthDataResponse, AuthService } from "./auth.service";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogin: boolean = true;
  authSubscription = new Subscription();
  isLoading: boolean = false;
  errorMessage: string = null;

  // access component directive
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.select("auth").subscribe((authState) => {
      this.isLoading = authState.loading;
      this.errorMessage = authState.authError;

      if (this.errorMessage) this.showErrorAlert(this.errorMessage);
    });
  }

  onSubmit(f: NgForm) {
    if (!f.valid) return;
    const email = f.value.email;
    const password = f.value.password;
    this.isLoading = true;

    let authObs: Observable<AuthDataResponse>;

    if (this.isLogin) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    } else {
      authObs = this.authService.signup(email, password);
    }

    // authObs.subscribe(
    //   (response) => {
    //     this.isLoading = false;
    //     // console.log(response);
    //     this.router.navigate(["/recipes"]);
    //   },
    //   (err) => {
    //     console.log("err", err);
    //     this.isLoading = false;
    //     this.errorMessage = err;
    //     this.showErrorAlert(err);
    //   }
    // );

    f.reset();
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    if (this.closeSub) this.closeSub.unsubscribe();
  }

  onHandlerError() {
    this.errorMessage = null;
  }

  // show error programmatically
  private showErrorAlert(message: string) {
    const componentAlertFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const compRef = hostViewContainerRef.createComponent(componentAlertFactory);
    compRef.instance.message = message;
    this.closeSub = compRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
