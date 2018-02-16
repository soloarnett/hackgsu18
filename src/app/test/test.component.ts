import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  printMe:string = ""
  constructor() { }

  ngOnInit() {
    try{
      this.printMe = localStorage.getItem("pushUID")
    }catch(e){
      console.log(e.toString());
    }
    
  }

}
