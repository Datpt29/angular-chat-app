import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserInfoVisible = false;
  @ViewChild('UserInfo') UserInfo?: ElementRef;
  sideBarItem: any;
  showModal = false;

  constructor(private Shared: SharedService, private route: Router) { }

  ngOnInit(): void {
    this.Shared.currentMessage$.subscribe(data => {
      if (data) {
        this.sideBarItem = data;
      }
    });
  }

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

  showLogoutModal() {
    this.showModal = true;
  }

  hideLogoutModal() {
    this.showModal = false;
  }

  cancel() {
    this.hideLogoutModal();
  }

  confirm() {
    this.route.navigate(['auth/login']);
    this.hideLogoutModal();
  }
}
