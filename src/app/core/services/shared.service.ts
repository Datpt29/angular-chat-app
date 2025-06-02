import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { sidebarItem } from 'src/app/models/sidebarItem';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private messageSend = new BehaviorSubject<sidebarItem[]>([]);
  public currentMessage$: Observable<sidebarItem[]> = this.messageSend.asObservable();

  constructor() { }

  updateMessage(message: sidebarItem[]) {
    this.messageSend.next(message);
  }
}
