import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.sass'],
})
export class LoginComponent {
    errorMessage: string;
    pageTitle= 'Log In';

    constructor(private _authService: AuthService,
                private _router: Router) {}

    login(loginForm: NgForm) {
        if (loginForm && loginForm.valid) {
            let userName = loginForm.form.value.userName;
            let password = loginForm.form.value.password;
            this._authService.login(userName, password);

            if (this._authService.redirectUrl) {
                this._router.navigateByUrl(this._authService.redirectUrl);
            } else {
                this._router.navigate(['/projects']);
            }
         } else {
             this.errorMessage = 'Please enter a user name and password.';
         };
    }
}
