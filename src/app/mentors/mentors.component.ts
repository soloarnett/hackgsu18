import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertWindowService } from '../alert-window.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./mentors.component.scss']
})
export class MentorsComponent implements OnInit {

  alertActive:boolean
  alertVisible:boolean

  constructor(private http:HttpClient, private alertwindowservice:AlertWindowService, private router:Router) {
    alertwindowservice.alertActiveState$.subscribe(
      (alertActiveState:boolean) =>{
        this.alertActive = alertActiveState
      }
    )
    

    alertwindowservice.alertVisibleState$.subscribe(
      (alertVisibleState:boolean) =>{
        this.alertVisible = alertVisibleState
      }
    )
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
      this.router.navigateByUrl(where)
    }, 450)
  }

  ngOnInit() {
    this.startLoad()
  }

}
