import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../services/auth.service";

import { LoggerService } from "../services/logger.service";
import { Subscription } from "rxjs";
import {
  GrowlerService,
  GrowlerMessageType
} from "../../core/growler/growler.service";

@Component({
  selector: "cm-navbar",
  templateUrl: "navbar.component.html",
  styleUrls: ["navbar.component.css"]
})
export class NavBarComponent implements OnInit, OnDestroy {
  isCollapsed: boolean;
  loginLogoutText = "Login";
  sub: Subscription;

  constructor(
    private authService: AuthService,
    private growler: GrowlerService,
    private router: Router,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.sub = this.authService.authChanged.subscribe(
      (loggedIn: boolean) => {
        this.setLoginLogoutText();
      },
      (err: any) => this.logger.log(err)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
  }

  loginOrOut() {
    const isAuthenticated = this.authService.isAuthenticated;
    if (isAuthenticated) {
      this.authService.logout().subscribe(
        (status: boolean) => {
          this.growler.growl("Logged Out", GrowlerMessageType.Info);
          this.setLoginLogoutText();
          this.router.navigate(["/customers"]);
          return;
        },
        (err: any) => this.logger.log(err)
      );
    }
    this.redirectToLogin();
  }

  redirectToLogin() {
    this.router.navigate(["/login"]);
  }

  setLoginLogoutText() {
    this.loginLogoutText = this.authService.isAuthenticated
      ? "Logout"
      : "Login";
  }
}
