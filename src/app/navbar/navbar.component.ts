import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  open:boolean = false
  hackathon:string = "HackGSU"
  toggleMenuState(){
    this.open = this.open ? false : true
  }
  constructor() { }
  ngOnInit() {
  }

}
