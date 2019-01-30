import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  open:boolean = false
  hackathon:string = "HackGSU"
  toggleMenuState(link){
    this.open = this.open ? false : true
    // setTimeout(()=>{
      this.goto(link)
    // }, 100)
  }

  mentorRequest(){
    window.location.href = 'https://hackspurt.com/hackgsu/details'
  }

  checkMentorRequest(){
    window.location.href = 'https://hackspurt.com/hackgsu/request/status'
  }

  loaded:boolean = false;
  pageLoading:boolean = false;

  toggleLoad(){
    this.loaded = this.loaded ? false : true
    console.log('load toggled')
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
      try{
        this.router.navigateByUrl(where)
      }catch(e){
        // console.log('menu clicked')
      }
      
    }, 450)
  }
  constructor(private router:Router) { }
  ngOnInit() {
  }

}
