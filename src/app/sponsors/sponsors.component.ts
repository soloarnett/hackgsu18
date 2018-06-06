import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {

  constructor(private router:Router) { }
  sponsors:string = './assets/img/sponsors.png';
  loaded:boolean = false;
  pageLoading:boolean = false;

  toggleLoad(){
    this.loaded = this.loaded ? false : true
  }

  loadInOutAnimation(){
    return (this.loaded ? 'active' : 'inactive') + ' ' + (this.pageLoading ? 'loading' : 'notLoading')
  }

  startLoad(){
    this.pageLoading = true
    setTimeout(()=>{
      this.loaded = true
    }, 50)
    
    setTimeout(()=>{
      this.stopLoad()
    }, 450)
  }

  stopLoad(){
    this.pageLoading = false
  }

  goto(where:string){
    
    this.pageLoading = true
    setTimeout(()=>{
      this.loaded = false
    }, 50)
    
    setTimeout(()=>{
      this.stopLoad()
      this.router.navigateByUrl(where)
    }, 450)
  }

  ngOnInit() {
    this.startLoad()
  }

}
