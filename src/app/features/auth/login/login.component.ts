import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) { }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  onSubmit() {
    if (this.loginForm.invalid) { return; };

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    let errorUsername = document.querySelector(".error-usn") as HTMLElement;
    let errorPassword = document.querySelector(".error-psw") as HTMLElement;
    let message = document.querySelector(".message") as HTMLElement;
    let loginMessage = document.querySelector(".login-message") as HTMLElement;
    let inputUsername = document.getElementById("username") as HTMLInputElement;
    let inputPassword = document.getElementById("password") as HTMLInputElement;
    let attempts: number = parseInt(localStorage.getItem("failedAttempts") || "0");
    const Max_attempts = 5;

    const correctUsername: string = "admin@gmail.com";
    const correctPassword: string = "123456";

    if (attempts >= Max_attempts) {
      message.innerText = "Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau.";
      loginMessage.style.display = "flex";
      (document.getElementById("login-btn") as HTMLButtonElement).disabled = true;
    }

    if (username === correctUsername && password === correctPassword) {
      localStorage.removeItem("failedAttempts");
      this.router.navigate(['/userlist']);
    } else if (username && password) {
      attempts++;
      localStorage.setItem("failedAttempts", attempts.toString());
      if (attempts >= Max_attempts) {
        loginMessage.style.display = "flex";
        message.innerText = "Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau 5 phút";
        (document.getElementById("login-btn") as HTMLButtonElement).disabled = true;
      } else {
        loginMessage.style.display = "flex";
        message.innerText = "Bạn đã nhập sai tài khoản hoặc mật khẩu";
      }
    }

    function hideMessage() {
      loginMessage.style.display = "none";
    }

    document.addEventListener("click", function (event) {
      const target = event.target as HTMLElement;
      if (!loginMessage.contains(target) && target !== document.getElementById("login-btn")) {
        hideMessage();
      }
    });

    setTimeout(() => {
      hideMessage();
    }, 5000); //5s

    setTimeout(() => {
      localStorage.removeItem("failedAttempts");
      (document.getElementById("login-btn") as HTMLButtonElement).disabled = false;
      message.innerText = "";
    }, 300000); // 5m  
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
}
