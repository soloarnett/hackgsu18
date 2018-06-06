import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertWindowService } from '../alert-window.service';

@Component({
  selector: 'app-mentors-verify-status',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mentors-verify-status.component.html',
  styleUrls: ['./mentors-verify-status.component.scss']
})
export class MentorsVerifyStatusComponent implements OnInit {

  alertActive:boolean = true
  alertVisible:boolean = true

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


  id:string = this.route.snapshot.params['id']
  verification:string = this.route.snapshot.params['verification']

  url:string = "https://aeb4oc6uwg.execute-api.us-east-1.amazonaws.com/prod/verifymentorrequest"


  verifyRequest(){
    let request = this.http.request("POST", this.url, {
      body: {
        id: this.id,
        verification: this.verification
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(
      res => {
        // alert("success " + res)
        console.log(res)
        // this.id = "Success"
        // this.verification = "Success"
        this.alertwindowservice.setData("Your email has been verified. Loading your request...")
        setTimeout(()=>{
          this.router.navigate(["/support/status", this.id])
        }, 2000)
        
      },
      err => {
        alert('failed ' + err)
        this.id = "Failed"
        this.verification = "Failed"
      }
    );
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

    console.log(this.route.snapshot.params)

    if(this.id && this.verification){
      this.alertwindowservice.setData("Verifying your email")
      this.verifyRequest()
    }else{
      console.log("missing info")
    }
    this.alertwindowservice.hideButton()
    this.alertwindowservice.show()
  }

}
