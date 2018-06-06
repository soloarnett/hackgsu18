import { Component, OnInit } from '@angular/core';
import { AboutWindowHandlerService } from '../about-window-handler.service';
import { HttpClient } from '@angular/common/http';
import { AlertWindowService } from '../alert-window.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  
  alertActive:boolean
  alertVisible:boolean
  vetek:string = "./assets/img/logo-white.svg"

  interview = {
    name:null,
    email:null,
    link:null
  }
  constructor(private aboutwindowservice:AboutWindowHandlerService, private http:HttpClient, private alertwindowservice:AlertWindowService, private router:Router) {
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

  

  developers = [
    {
      name: 'Solo Arnett',
      position: 'Mobile & Cloud Engineer',
      company: 'Vetek',
      image: './assets/img/solo.png',
      website: 'https://vetekconsulting.com',
      relatedLinks : [
        {
          icon: './assets/img/github.png',
          label: 'GitHub',
          link: 'https://github.com/solomonarnett'
        },
        {
          icon: './assets/img/linkedin.png',
          label: 'LinkedIn',
          link: 'https://linkedin.com/in/solomonarnett'
        }
      ]
    },
    {
      name: 'Viraj Shah',
      position: 'Mobile & Cloud Engineer',
      company: 'Vetek',
      image: './assets/img/viraj.png',
      website: 'https://vetekconsulting.com',
      relatedLinks : [
        {
          icon: './assets/img/github.png',
          label: 'GitHub',
          link: 'https://github.com/youngvz'
        },
        {
          icon: './assets/img/linkedin.png',
          label: 'LinkedIn',
          link: 'https://www.linkedin.com/in/virajashah/'
        }
      ]
    }
  ]
  close(){
    this.aboutwindowservice.closeWindow()
  }

  validate(email:string){
    let validate:RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return validate.test(email)
  }

  getAnInterview(isAllergic){
      if(this.interview.email && this.validate(this.interview.email) && this.interview.name){
        this.alertwindowservice.showDataWithoutButton('Securing your spot')
        let url = "https://aeb4oc6uwg.execute-api.us-east-1.amazonaws.com/prod/createintern"
        // console.log("function runs")
        let request = this.http.request("POST", url, {
          body: {
            emailAddress: this.interview.email,
            name: this.interview.name,
            link: this.interview.link ? this.interview.link : "no link",
            isAllergic: isAllergic
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).subscribe(
          res => {
            this.alertwindowservice.showDataWithButton("We'll be emailing you soon with more details.")
            this.interview.email = null
            this.interview.link = null
            this.interview.name = null
          },
          err => {
            this.alertwindowservice.showDataWithButton('An error occurred. Please try again later.')
          }
        );
      }else{
        this.alertwindowservice.showDataWithButton('You must enter a valid email and your name.')
      }
      // setTimeout(()=>{
      //   this.alertwindowservice.hide()
      // }, 2000)
  }

  navigateExternal(link){
    window.open(
      link,
      '_blank' // <- This is what makes it open in a new window.
    );
  }
  ngOnInit() {
    // this.alertwindowservice.showDataWithButton('hello')
  }

}
