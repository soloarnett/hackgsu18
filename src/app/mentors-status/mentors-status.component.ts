import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertWindowService } from '../alert-window.service';

@Component({
  selector: 'app-mentors-status',
  templateUrl: './mentors-status.component.html',
  encapsulation:ViewEncapsulation.None,
  styleUrls: ['./mentors-status.component.scss']
})
export class MentorsStatusComponent implements OnInit {

  url:string = "https://aeb4oc6uwg.execute-api.us-east-1.amazonaws.com/prod/checkmentorrequest"
  id:string = this.route.snapshot.params.id
  pushUID:string = localStorage.getItem("pushUID")
  statusAvailable:boolean = false
  request
  email:string
  emailFromPush:string
  requestType:string
  cancelHidden:boolean = false
  emailHidden:boolean = false
  
  
  checkEmailFromPush(){
    try{
      let emailFromPush = localStorage.getItem('storedUser')
      emailFromPush = JSON.parse(emailFromPush).email
      this.emailFromPush = emailFromPush
      this.checkEmailWithPushUID()
    }catch(e){
      this.checkPushUID()
    }
  }

  distribute(result){
    if(result){
      this.statusAvailable = true
      this.alertwindowservice.hide()
      this.request.id = result['id']
      this.request.name = result['name']
      this.request.status = result['status']
      this.request.shirtColor = result['shirtColor']
      
      switch(this.request.status.toLowerCase()){
        case 'cancelled':
        case 'completed':
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
      this.alertwindowservice.showDataWithButton("You don't have any requests. Try creating one by going to<br> \"Get Help Now\"<br> or enter an email to check another request.")
      this.emailHidden = false
    }
  }

  checkId(){
    if(this.id){
      this.requestType = "id"
      let request = this.http.request("POST", this.url, {
        body: {
          id: this.id,
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe(
        res => {
          this.distribute(res)
        },
        err => {
          alert('failed ' + err)
          console.log(err)
        }
      );
    }
    
  }

  checkEmailWithPushUID(){
    let validate:RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let performCheck = ()=>{
      if(this.emailFromPush && validate.test(this.emailFromPush)){
        this.requestType = "emailFromPush"
        // this.alertwindowservice.showDataWithoutButton("Checking email for request...<br><br>Please wait")
        setTimeout(()=>{
          let request = this.http.request("POST", this.url, {
            body: {
              email: this.emailFromPush,
            },
            headers: {
              'Content-Type': 'application/json'
            }
          }).subscribe(
            res => {
              this.distribute(res)
            },
            err => {
              this.alertwindowservice.showDataWithButton("An error has occurred, Please try again later.")
            }
          );
        }, 400)
      }else{
        this.alertwindowservice.showDataWithButton("You must enter a valid email address.<br><br>Please try again.")
      }
    }
    performCheck()
  }

  checkEmail(){
    let validate:RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let performCheck = ()=>{
      if(this.email && validate.test(this.email)){
        this.requestType = "email"
        this.alertwindowservice.showDataWithoutButton("Checking email for request...<br><br>Please wait")
        setTimeout(()=>{
          let request = this.http.request("POST", this.url, {
            body: {
              email: this.email,
            },
            headers: {
              'Content-Type': 'application/json'
            }
          }).subscribe(
            res => {
              this.distribute(res)
              this.cancelHidden = true
            },
            err => {
              this.alertwindowservice.showDataWithButton("An error has occurred, Please try again later.")
            }
          );
        }, 400)
      }else{
        this.alertwindowservice.showDataWithButton("You must enter a valid email address.<br><br>Please try again.")
      }
    }
    performCheck()
  }

  checkPushUID(){
    this.requestType = "pushUID"
    if(this.pushUID){
      let request = this.http.request("POST", this.url, {
        body: {
          pushUID: this.pushUID,
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe(
        res => {
          this.distribute(res)
        },
        err => {
          this.alertwindowservice.showDataWithButton("You must enter a valid email address.<br><br>Please try again.")
        }
      );
    }
  }

  alertActive:boolean = false
  alertVisible:boolean = false

  constructor(private route:ActivatedRoute, private http:HttpClient, private router:Router, private alertwindowservice:AlertWindowService) {
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

  refresh(){
    this.alertwindowservice.showDataWithoutButton("Checking again...<br><br>Please wait")
    setTimeout(()=>{
      switch(this.requestType){
        case "id":
          this.checkId()
          break
        case "email":
          this.checkEmail()
          break
        case "pushUID":
          this.checkPushUID()
          break
        case "emailFromPush":
          this.checkEmailWithPushUID()
          break
      }
    }, 400)
  }

  wrong(){
    // this.alertwindowservice.setNextPage('/support/new')
    this.alertwindowservice.showDataWithButton('You can look up another request by entering an email.<br><br>You won\'t be able to take action on requests looked up by email.')
    setTimeout(()=>{
      this.statusAvailable = false
      this.emailHidden = false
    }, 400)
    
  }

  cancel(){
    // console.log("begin")
    // console.log("id is: " + this.request.id)
    this.alertwindowservice.showDataWithoutButton('Canceling your request...<br><br>Please wait')
    if(this.request.id){
      let url = " https://aeb4oc6uwg.execute-api.us-east-1.amazonaws.com/prod/cancelmentorrequest"
      // console.log("function runs")
      let request = this.http.request("POST", url, {
        body: {
          id: this.request.id,
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe(
        res => {
          // console.log("result")
          // console.log("res is " + JSON.stringify(res))
          this.alertwindowservice.setNextPage('/support')
          this.alertwindowservice.showDataWithButton('Your request has been canceled.')
        },
        err => {
          alert('failed ' + err)
          console.log(err)
        }
      );
    }
  }

  newRequest(){
    this.router.navigateByUrl('/support/new')
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

  ngOnInit() {
    this.startLoad()
    this.request = {
      name:null,
      status:null,
      room:null,
      nearest:null,
      shirtColor:null
    }

    if(this.id){
      this.alertwindowservice.showDataWithoutButton("Loading your request...")
      this.checkId()
      this.emailHidden = true
      
    }else if(this.pushUID){
      this.alertwindowservice.showDataWithoutButton("Loading your request...")
      this.checkEmailFromPush()
      this.emailHidden = true
    }
  }

}
