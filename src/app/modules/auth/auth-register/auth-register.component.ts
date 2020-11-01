import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { AccessTokenService } from '../../../core/services/access-token.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../shared/components/base.component';
import { Registration } from '../../../shared/models/registration.model';
import { NgForm } from '@angular/forms';
import { GrowlType } from '../../../core/enums/growl-type';
import { GrowlService } from '../../../core/services/growl.service';

@Component({
  selector: 'croco-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('form') public form: NgForm;
  public credentialsModel: Registration;
  public isLoading: boolean;

  constructor(
    private authService: AuthService,
    private accessTokenService: AccessTokenService,
    private router: Router,
    private growlService: GrowlService
  ) {
    super();
  }

  private resetCredentialModel(): void {
    this.credentialsModel = new Registration();
    this.credentialsModel.Username = '';
    this.credentialsModel.Password = '';
  }

  private submitCredentials(): void {
    this.isLoading = true;

    const sub = this.authService.register(this.credentialsModel)
      .subscribe(payload => {
        if (payload) {
          this.accessTokenService.storeJWTToken(payload.AccessToken);
          this.authService.setCurrentUser(payload.User);
          this.router.navigate(['main'])
            .then(() => this.growlService.appear(GrowlType.SUCCESS, 'Welcome ' + this.credentialsModel.Username));
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

  public onSubmit(form: NgForm): void {
    this.submitCredentials();
  }
}
