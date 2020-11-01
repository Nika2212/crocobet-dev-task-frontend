import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../models/user.model';
import { BaseComponent } from '../base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'croco-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  public currentUser: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  private getCurrentUser(): void {
    const sub = this.authService.getCurrentUser()
      .subscribe(payload => this.currentUser = payload);
    this.addSubscription(sub);
  }

  public ngOnInit(): void {
    this.getCurrentUser();
  }

  public onLogout(): void {
    this.router.navigate(['auth']);
  }

}
