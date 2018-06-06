import { Component, ViewEncapsulation } from '@angular/core';
import { AlertWindowService } from './alert-window.service';
import { fadeInAnimation } from './_animations/fadeInAnimation';
import { AboutWindowHandlerService } from './about-window-handler.service';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  providers: [AlertWindowService, AboutWindowHandlerService],
  // animations: [fadeInAnimation],
  // host: { '[@fadeInAnimation]': '' },
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HackGSU';
  
  
  ngOnInit(){
    // console.log("push is: " + localStorage.getItem("pushUID"))
    // console.log("os is " + localStorage.getItem("OS"))
    if(!localStorage.getItem("OS")){
      localStorage.setItem("OS", "computer")
    }

    
    
  }
}
