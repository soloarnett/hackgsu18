import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AboutWindowHandlerService {

  private windowOpenSource = new Subject<boolean>()
  windowOpenState$ = this.windowOpenSource.asObservable()

  windowOpen:boolean = false

  constructor() { }

  toggleWindow(){
    this.windowOpen ? this.closeWindow() : this.openWindow()
  }

  openWindow(){
    this.windowOpen = true
    this.windowOpenSource.next(true)
  }

  closeWindow(){
    this.windowOpen = false
    this.windowOpenSource.next(false)
  }
}
