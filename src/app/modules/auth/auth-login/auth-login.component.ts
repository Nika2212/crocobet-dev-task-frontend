import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Authorization } from '../../../shared/models/authorization.model';
import { AuthService } from '../../../core/services/auth.service';
import { BaseComponent } from '../../../shared/components/base.component';
import { Router } from '@angular/router';
import { AccessTokenService } from '../../../core/services/access-token.service';
import { GrowlService } from '../../../core/services/growl.service';
import { NgForm } from '@angular/forms';
import { GrowlType } from '../../../core/enums/growl-type';

@Component({
  selector: 'croco-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('form') public form: NgForm;
  public credentialsModel: Authorization;
  public isLoading: boolean;
  public userChecked: boolean;

  constructor(
    private authService: AuthService,
    private accessTokenService: AccessTokenService,
    private growlService: GrowlService,
    private router: Router
  ) {
    super();
  }

  private resetCredentialModel(): void {
    this.credentialsModel = new Authorization();
    this.credentialsModel.Username = '';
    this.credentialsModel.Password = '';
  }

  private submitCredentials(): void {
    this.isLoading = true;

    const sub = this.authService.login(this.credentialsModel)
      .subscribe(payload => {
        if (payload) {
          this.accessTokenService.storeJWTToken(payload.AccessToken);
          this.authService.setCurrentUser(payload.User);
          this.router.navigate(['main'])
            .then(() => this.growlService.appear(GrowlType.SUCCESS, 'Welcome back ' + this.credentialsModel.Username));
        } else {
          this.isLoading = false;
          this.form.form.controls.Password.setErrors({'incorrect': true});
        }
      });

    this.addSubscription(sub);
  }

  public ngOnInit(): void {
    this.resetCredentialModel();
    this.accessTokenService.clearStorage();
  }

  public ngOnDestroy(): void {
    this.clearSubscriptions();
  }

  public checkUser(): void {
    if (this.credentialsModel && this.credentialsModel.Username.length > 2) {
      this.isLoading = true;
      const sub = this.authService.checkUser(this.credentialsModel.Username)
        .subscribe(payload => {

          if (!payload) {
            this.form.form.controls.Username.setErrors({'incorrect': true});
            this.userChecked = false;
          } else {
            this.userChecked = true;
          }

          this.isLoading = false;
        });

      this.addSubscription(sub);
    }
  }

  public onSubmit(form: NgForm): void {
    this.submitCredentials();
  }
}
