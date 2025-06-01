import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserInfoVisible = false;
  @ViewChild('UserInfo') UserInfo?: ElementRef;
  constructor() { }

  ngOnInit(): void {
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


}
