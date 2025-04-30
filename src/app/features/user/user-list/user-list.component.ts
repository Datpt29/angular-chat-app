import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('UserInfo') UserInfo?: ElementRef;
  isUserInfoVisible = false;
  isLogoutPopupVisible = false;
  isAddUserPopupVisible = false;
  isEditUserPopupVisible = false;
  users: any;

  constructor(private router: Router, private user: UserService) { }

  showUserInfo(): void {
    this.isUserInfoVisible = true;
  }

  hideUserInfo(event: MouseEvent | null, UserInfo?: ElementRef): void {
    if (event?.target && UserInfo) {
      const target = event.target as HTMLElement;
      if (!UserInfo.nativeElement.contains(target)) {
        this.isUserInfoVisible = false;
      }
    }
  }

  showLogoutPopup(): void {
    this.isLogoutPopupVisible = true;
  }

  hideLogoutPopup(): void {
    this.isLogoutPopupVisible = false;
  }

  showAddUserPopup(): void {
    this.isAddUserPopupVisible = true;
  }

  hideAddUserPopup(): void {
    this.isAddUserPopupVisible = false;
  }

  showEditUserPopup(): void {
    this.isEditUserPopupVisible = true;
  }

  hideEditUserPopup(): void {
    this.isEditUserPopupVisible = false;
  }

  onPopupBackgroundClick(event: MouseEvent, popupContainer: HTMLElement): void {
    const target = event.target as HTMLElement;
    if (!popupContainer.contains(target)) {
      this.hideLogoutPopup();
      // this.hideAddUserPopup();
      // this.hideEditUserPopup();
    }
  }

  navigate(): void {
    this.router.navigate(['/login']);
  }

  getAll(): void {
    this.user.getList().subscribe({
      next: (res: any) => {
        this.users = res;
      }
    });
  }

  ngOnInit(): void {
    this.user.getList().subscribe(res => {
      this.users = res;
      console.log(this.users);
    })
  }

  onDelete(id: number): void {
    this.user.delete(id).subscribe({
      next: (res: any) => {
        this.getAll();
      }
    });
  }

  createForm: FormGroup = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  get first_name() { return this.createForm.get('first_name') }
  get last_name() { return this.createForm.get('last_name') }
  get email() { return this.createForm.get('email') }

  onSubmit(): void {
    if (this.createForm.valid) {
      this.user.create(this.createForm.value).subscribe({
        next: (res: any) => {
          this.getAll();
          this.createForm.reset();
        }
      });
      this.isAddUserPopupVisible = false;
    }
  }

  editForm: FormGroup = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  })
}
