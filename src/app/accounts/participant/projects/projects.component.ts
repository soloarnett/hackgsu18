import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  menuState:boolean = false
  
  constructor() { }

  toggleMenuState(){
    this.menuState = !this.menuState
  }
  ngOnInit() {
  }

}
