import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public auth: AuthService, private router: Router) { }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  isLoginMessageVisible = false;
  isDisabledButton = false;

  showLoginMessage() {
    if (this.loginMessage != "") {
      this.isLoginMessageVisible = true;
    }
  }

  hideLoginMessage() {
    this.isLoginMessageVisible = false;
  }

  loginMessage: string = "";
  onSubmit() {
    if (this.loginForm.invalid) { return; };
    let attempts: number = parseInt(localStorage.getItem("failedAttempts") || "0");
    const Max_attempts = 5;

    if (attempts >= Max_attempts) {
      this.loginMessage = "Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau 5 phút";
      this.isDisabledButton = true;
      this.showLoginMessage();
      this.unLockLogin();
      this.hidePopup();
      return;
    }

    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res.status == 200) {
          localStorage.removeItem("failedAttempts");
          this.router.navigate(['user/userlist']);
          localStorage.setItem('token', res.body.token);
        }
      },

      error: (err) => {
        if (err.status == 400) {
          attempts++;
          localStorage.setItem("failedAttempts", attempts.toString());
          if (attempts >= Max_attempts) {
            this.loginMessage = "Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau 5 phút";
            this.isDisabledButton = true;
            this.unLockLogin();
          } else {
            this.loginMessage = "Bạn đã nhập sai tài khoản hoặc mật khẩu"
          }
          this.showLoginMessage();
          this.hidePopup();
        }
      }
    });
  }

  hidePopup() {
    setTimeout(() => {
      this.hideLoginMessage();
      this.loginMessage = "";
    }, 5000); //5s
  }

  unLockLogin() {
    setTimeout(() => {
      localStorage.removeItem("failedAttempts");
      this.loginMessage = "";
      this.isDisabledButton = false;
    }, 300000); // 5m  
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
}


