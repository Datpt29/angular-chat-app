import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('UserInfo') UserInfo?: ElementRef;
  isAddUserPopupVisible = false;
  isEditUserPopupVisible = false;
  users: any;

  constructor(private router: Router, private user: UserService) { }

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

  navigate(): void {
    this.router.navigate(['auth/login']);
    localStorage.removeItem('token');
  }

  getAll(): void {
    this.user.getList().subscribe({
      next: (res: any) => {
        this.users = res.data;
      }
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  onDelete(id: number): void {
    this.user.delete(id).subscribe({
      next: (res) => {
        this.getAll();
        console.log(res.status);
      }
    }
    );
  }

  createForm: FormGroup = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get first_name() { return this.createForm.get('first_name') }
  get last_name() { return this.createForm.get('last_name') }
  get email() { return this.createForm.get('email') }

  onCreate(): void {
    if (this.createForm.valid) {
      this.user.create(this.createForm.value).subscribe({
        next: (res: any) => {
          this.getAll();
          this.createForm.reset();
          this.isAddUserPopupVisible = false;
          console.log(res.status);
        }
      });
    }
  }

  editForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  get first_name_edit() { return this.editForm.get('first_name') }
  get last_name_edit() { return this.editForm.get('last_name') }
  get email_edit() { return this.editForm.get('email') }

  getIdEdit(id: number): void {
    this.user.getById(id).subscribe({
      next: (res: any) => {
        this.editForm.patchValue({
          id: res.data.id,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          email: res.data.email,
        });
      }
    });
  }

  onUpdate(): any {
    if (this.editForm.valid) {
      this.user.update(this.editForm.value.id, this.editForm.value).subscribe({
        next: (res) => {
          this.getAll();
          this.editForm.reset();
          this.isEditUserPopupVisible = false;
          console.log(res.status);
        }
      });
    }
  }
}
