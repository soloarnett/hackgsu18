import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { HttpRequest } from 'selenium-webdriver/http';
import { AlertWindowService } from '../alert-window.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-mentors-new',
  templateUrl: './mentors-new.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./mentors-new.component.scss']
})
export class MentorsNewComponent implements OnInit {

  image:string = "../assets/img/help.svg"
  

  howitworks = {
    label: "How It Works",
    description: "After you fill out the short form below, someone who can help will come to assist you. It's that simple."
  }

  requestInputs = {
    firstname: {
      content: null,
      prefilled: false,      
      active: true
    },
    lastname: {
      content: null,
      prefilled: false,
      active: true
    },
    email: {
      content: null,
      prefilled: false,
      active: true
    },
    room: {
      content: null,
      active: true
    },
    nearestRoom: {
      content: null,
      active: true
    },
    description: {
      content: null,
      placeholder: "You can ask anything from programming questions to general questions about the hackathon.",
      active: true
    },
    schoolName: {
      content: null,
      prefilled: false,
      description: "This will help us improve our app.",
      active: true
    },
    teamName: {
      content: null,
      prefilled: false,
      description: "This will help us improve our app.",
      active: true
    },
    favorite: {
      content: null,
      prefilled: false,
      description: "This is a security question. It will help you recover your data.",
      active: true
    },
    shirtColor: {
      content: null,
      description: "This will help the mentor locate you amongst your friends.",
      active: true
    },
  }

  agreement:string = "By clicking \"Submit\", you agree to let Vetek Consulting use the data gathered from this form to improve this product."

  alertActive:boolean

  alertVisible:boolean
  
  // blankInputs = Object.assign({},this.requestInputs)

  submitRequest(){
    let url = "https://aeb4oc6uwg.execute-api.us-east-1.amazonaws.com/prod/creatementorrequest"
    let inputs = this.requestInputs
    let pushUID = localStorage.getItem("pushUID")
    let system = localStorage.getItem("OS")
    let validate:RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // console.log(this.requestInputs)
    // console.log(inputs.description.content)
    // console.log("pushuid is: " + pushUID)
    // console.log("OS is: " + system)
    if(inputs.description.content == null || inputs.email.content == null || inputs.favorite.content == null || inputs.firstname.content == null || inputs.lastname.content == null || inputs.schoolName.content == null || inputs.shirtColor.content == null || (inputs.room.content == null && inputs.nearestRoom.content == null)){
      this.alertwindowservice.setData("Please enter a value for all fields. Then try again.")
      this.alertwindowservice.show()
    }else{
      this.alertwindowservice.setData("Sending... Please wait.")
      this.alertwindowservice.show()
      if(validate.test(inputs.email.content)){
        let request = this.http.request("POST",url, {
          body: {
            name: inputs.firstname.content + " " + inputs.lastname.content,
            email: inputs.email.content,
            description: inputs.description.content,
            room: inputs.room.content ? inputs.room.content : null,
            nearest: inputs.nearestRoom.content ? inputs.nearestRoom.content : null,
            shirtColor: inputs.shirtColor.content,
            teamName: inputs.teamName.content ? inputs.teamName.content : "null",
            pushUID: pushUID ? pushUID : null,
            favorite: inputs.favorite.content ? inputs.favorite.content : null
          },
    
          headers: {
            'Content-Type': 'application/json'
          }
        }).subscribe(
          res => {
            console.log(res)
            try{
              if(res['statusCode']){
                switch(res['statusCode']){
                  case 204:
                    // already exists
                    this.alertwindowservice.setNextPage('/support/status/' + res['body'].mentorRequest.id)
                    this.alertwindowservice.showDataWithButton('You already have an open request.<br><br>Please wait for your existing request to be fulfilled or cancel it on the following screen.')
                    break
                  case 202:
                    // this.alertwindowservice.setNextPage('/support/status')
                    this.alertwindowservice.showDataWithButton('Taking you to your request')
                    setTimeout(()=>{
                      this.router.navigateByUrl('/support/status')
                    }, 2000)
                    break
                }
              }
            }catch(e){
                // doesn't exist
                this.storeUserLocally(inputs.firstname.content, inputs.lastname.content, inputs.email.content, inputs.favorite.content, inputs.teamName.content ? inputs.teamName.content : null, inputs.schoolName.content)
                this.alertwindowservice.setData("Check your email:<br><br>" + inputs.email.content + "<br><br>Click the verification link to complete your support request.")
                this.alertwindowservice.setNextPage('/support/status')
                this.alertwindowservice.show()
            }
            
            
            // this.requestInputs = Object.assign({},this.blankInputs)
          },
          err => {
            this.alertwindowservice.setData("An error has occurred")
            this.alertwindowservice.show()
          }
        );
      }else{
        // alert('Please enter a valid email address.')
        this.alertwindowservice.setData("Please enter a valid email address. Then try again.")
        this.alertwindowservice.show()
      }
    }
    
  }

  storeUserLocally(firstname, lastname, email, favorite, teamName, schoolName){
    if(localStorage.getItem('pushUID')){
      localStorage.setItem('storedUser', JSON.stringify({
        firstname: firstname,
        lastname : lastname,
        email : email,
        favorite: favorite,
        teamName: teamName,
        schoolName : schoolName,
        pushUID: localStorage.getItem('pushUID')
      }))
    }
  }

  getLocalUser(){
    let localUser
    let pushUID = localStorage.getItem('pushUID')
    if(localStorage.getItem('storedUser')){
      localUser = JSON.parse(localStorage.getItem('storedUser'))
    }
    try{
      if(localUser.pushUID == pushUID){
        var firstname = this.requestInputs.firstname
        var lastname = this.requestInputs.lastname
        var email = this.requestInputs.email
        var teamName = this.requestInputs.teamName
        var schoolName = this.requestInputs.schoolName
        
        firstname.content = localUser.firstname
        firstname.prefilled = true
        
        lastname.content = localUser.lastname
        lastname.prefilled = true

        email.content = localUser.email
        email.prefilled = true

        teamName.content = localUser.teamName ? localUser.teamName : null
        if(teamName.content){
          teamName.prefilled = true
        }
        
        schoolName.content = localUser.schoolName ? localUser.schoolName : null
        if(schoolName.content){
          schoolName.prefilled = true
        }
      }
    }catch(e){
      // no push uid in local
      console.log('no pushuid in local')
    }
  }

  removePrefill(element){
    switch(element){
      case 'firstname':
        this.requestInputs.firstname.prefilled = false
        break
      case 'lastname':
        this.requestInputs.lastname.prefilled = false
        break
      case 'email':
        this.requestInputs.email.prefilled = false
        break
      case 'teamName':
        this.requestInputs.teamName.prefilled = false
        break
      case 'schoolName':
        this.requestInputs.schoolName.prefilled = false
        break
    }
  }

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
    // console.log(this.router)
    this.getLocalUser()
    this.startLoad()
  }

}
