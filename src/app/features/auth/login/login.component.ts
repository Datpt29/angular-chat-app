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

  ngOnInit(): void {
    this.auth.getList().subscribe(res => {
      this.auth = res;
    })
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  isLoginMessageVisible = false;

  showLoginMessage() {
    this.isLoginMessageVisible = true;
  }

  hideLoginMessage() {
    this.isLoginMessageVisible = false;
  }


  getAll(): void {
    this.auth.getList().subscribe({
      next: (res: any) => {
        this.auth = res;
      }
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) { return; };
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    let attempts: number = parseInt(localStorage.getItem("failedAttempts") || "0");
    const Max_attempts = 5;


    // if (attempts >= Max_attempts) {
    //   message.innerText = "Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau 5 phút";
    //   loginMessage.style.display = "flex";
    //   (document.getElementById("login-btn") as HTMLButtonElement).disabled = true;
    // }

    // if (username === correctUsername && password === correctPassword) {
    //   localStorage.removeItem("failedAttempts");
    //   this.router.navigate(['user/userlist']);
    // } else if (username && password) {
    //   attempts++;
    //   localStorage.setItem("failedAttempts", attempts.toString());

    //   if (attempts >= Max_attempts) {
    //     loginMessage.style.display = "flex";
    //     message.innerText = "Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau 5 phút";
    //     (document.getElementById("login-btn") as HTMLButtonElement).disabled = true;
    //   } else {
    //     loginMessage.style.display = "flex";
    //     message.innerText = "Bạn đã nhập sai tài khoản hoặc mật khẩu";
    //   }
    // }

    setTimeout(() => {
      this.hideLoginMessage();
    }, 10000); //10s

    // setTimeout(() => {
    //   localStorage.removeItem("failedAttempts");
    //   message.innerText = "";
    // }, 300000); // 5m  
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
}
