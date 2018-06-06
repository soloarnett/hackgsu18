import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertWindowService } from '../alert-window.service';
import { Router } from '@angular/router';
import * as $ from 'jquery'

@Component({
  selector: 'app-mentors-login',
  templateUrl: './mentors-login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./mentors-login.component.scss']
})
export class MentorsLoginComponent implements OnInit {

  alertActive:boolean

  alertVisible:boolean

  statusAvailable:boolean = false

  loggedIn:boolean = false
  email:string = ""
  emailPrefill:boolean = false
  pin:string = ""
  mentorid:string = ""

  request = {
    id: null,
    name: null,
    room: null,
    nearest: null,
    shirtColor: null,
    status: null,
  }
  cancelHidden:boolean = true

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

  
  logout(){
    this.router.navigateByUrl('/support')
  }


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

  validate(email:string){
    let validate:RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return validate.test(email)
  }

  distribute(result){
    if(result){
      this.statusAvailable = true
      this.request.id = result['id']
      this.mentorid = result['mentor']
      this.request.name = result['name']
      this.request.status = result['status']
      this.request.shirtColor = result['shirtColor']
      if(this.request.status.toLowerCase() == 'cancelled'){
        this.cancelHidden = true
      }
      switch(this.request.status.toLowerCase()){
        case 'cancelled':
          this.cancelHidden = true
          break
        case 'created':
          this.request.status = 'Verify Email'
          break
      }
      if(result['room']){
        this.request.room = result['room']
      }else if(result['nearest']){
        this.request.nearest = result['nearest']
      }
    }else{
      this.alertwindowservice.setNextPage('/support')
      this.alertwindowservice.showDataWithButton('You don\'t have any requests.<br><br>We\'ll email you when you do. You can also check back here later if you\'re unsure.<br><br>You\'ve been logged out.')
    }
  }

  login($event){
    $(event.target).blur()
    if(this.email && this.validate(this.email) && this.pin){
      this.alertwindowservice.showDataWithoutButton('Logging in...<br><br>Please wait')
      let url = "https://aeb4oc6uwg.execute-api.us-east-1.amazonaws.com/prod/verifymentor"
      // console.log("function runs")
      let request = this.http.request("POST", url, {
        body: {
          email: this.email,
          pin: this.pin
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe(
        res => {
          try{
            switch(res['statusCode']){
              case 200:
                this.saveMentorEmail(this.email)
                this.email = null
                this.pin = null
                this.loggedIn = true
                this.distribute(res['body'])
                if(this.getfirstTimeStatus()){
                  this.alertwindowservice.showDataWithButton('For security:<br><br>When you leave the following screen, you are automatically logged out.')
                  this.setFirstTimeStatus()
                }else{
                  this.alertwindowservice.hide()
                }
                break
              case 204:
                this.email = null
                this.pin = null
                this.alertwindowservice.setNextPage('/support')
                this.alertwindowservice.showDataWithButton('You don\'t have any requests.<br><br>We\'ll email you when you do. You can also check back here later if you\'re unsure.<br><br>You\'ve been logged out.')
                break
              case 401:
                this.alertwindowservice.showDataWithButton('Your email or pin was incorrect.<br><br>Please try again or contact the system administrator.')
                this.pin = null
                break
              // default:
                // throw 'no result'  
            }
          }catch(e){
            console.log(e)
            // this.alertwindowservice.showDataWithButton('An error occurred. Please try again later.')
          }
        },
        err => {
          this.alertwindowservice.showDataWithButton('An error occurred. Please try again later.')
        }
      );
    }else{
      this.alertwindowservice.showDataWithButton('You must enter a valid email and pin.')
    }
    // setTimeout(()=>{
    //   this.alertwindowservice.hide()
    // }, 2000)
  }

  complete(){
    this.alertwindowservice.showDataWithoutButton('Completing request...<br><br>Please wait.')
    let url = "https://aeb4oc6uwg.execute-api.us-east-1.amazonaws.com/prod/completerequest"
    if(this.mentorid && this.request.id){
      let request = this.http.request("POST", url, {
        body: {
          requestId: this.request.id,
          mentorId: this.mentorid
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe(
        res => {
          this.alertwindowservice.setNextPage('/support')
          this.alertwindowservice.showDataWithButton('Request has been completed successfully.<br><br>We\'ll notify you when a new request has been assigned to you.')
        },
        err => {
          this.alertwindowservice.showDataWithButton('An error occurred. Please try again later.')
        }
      );
    }
    
  }

  defer(){
    this.alertwindowservice.showDataWithoutButton('Completing request...<br><br>Please wait.')
    let url = "https://aeb4oc6uwg.execute-api.us-east-1.amazonaws.com/prod/defermentorrequest"
    if(this.mentorid && this.request.id){
      let request = this.http.request("POST", url, {
        body: {
          id: this.request.id,
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe(
        res => {
          this.alertwindowservice.setNextPage('/support')
          this.alertwindowservice.showDataWithButton('Your request was deferred.<br><br>Make sure to only defer requests that you are certain you cannot complete.<br><br>Deferring a request increases the time it\'ll take for a student to be helped.')
        },
        err => {
          this.alertwindowservice.showDataWithButton('An error occurred. Please try again later.')
          console.log(err)
        }
      );
    }
    
  }

  setFirstTimeStatus(){
    localStorage.setItem('mentorFirstLogin', JSON.stringify({
      lastLogin: Date.now() 
    }))
  }

  saveMentorEmail(email:string){
    // console.log(email)
    localStorage.setItem('storedMentor', JSON.stringify({
      email: email
    }))
  }

  getMentorEmail(){
    try{
      let mentor = localStorage.getItem('storedMentor')
      // console.log(mentor)
      let email = JSON.parse(mentor).email
      // console.log(email)
      this.emailPrefill = true
      this.email = email
    }catch(e){
      // console.log(e)
    }
  }

  getfirstTimeStatus(){
    return localStorage.getItem('mentorFirstLogin') ? false : true
  }

  clearPrefill(){
    this.emailPrefill = false
  }

  checkId(){
    if(this.request.id){
      let url:string = "https://aeb4oc6uwg.execute-api.us-east-1.amazonaws.com/prod/checkmentorrequest"
      let request = this.http.request("POST", url, {
        body: {
          id: this.request.id,
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe(
        res => {
          this.distribute(res)
          this.alertwindowservice.hide()
        },
        err => {
          alert('failed ' + err)
          console.log(err)
        }
      );
    }
    
  }
  schedule(){
    this.router.navigateByUrl('/schedule')
  }

  refresh(){
    this.alertwindowservice.showDataWithoutButton('Checking again...<br><br>Please wait')
    this.checkId()
  }

  ngOnInit() {
    this.getMentorEmail()
    this.startLoad()
  }

}
