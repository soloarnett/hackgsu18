import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { HttpRequest } from 'selenium-webdriver/http';
import { AlertWindowService } from '../alert-window.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  currentDay:string = ""
  otherDays:Array<string> = []
  currentDate:string = ""
  events
  eventsByDay
  otherEvents

  alertActive:boolean = true
  alertVisible:boolean = true
  
  constructor(private http:HttpClient, private alertwindowservice:AlertWindowService) {
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

  getEvents(byDay){
    this.alertwindowservice.showDataWithoutButton('Just a moment...<br><br>Gathering all events')
    let url = "https://aeb4oc6uwg.execute-api.us-east-1.amazonaws.com/prod/getevents"
    let request = this.http.request("POST",url, {
      body: {
        byDay: byDay ? true : false
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(
      res => {
        this.events = res 
        console.log(this.events)
        this.events.forEach(day => {
          console.log(day)
          day.events.forEach(event => {
            switch(event.title.toLowerCase()){
              case 'lunch':
              case 'dinner':
              case 'snack':
              case 'breakfast':
              let theseEvents = this.events
              let thisDay = theseEvents[theseEvents.indexOf(day)]
              let thisEvent = thisDay.events[thisDay.events.indexOf(event)]
              thisEvent.description = null;
              // console.log(thisDay)
                // console.log(this.events[this.events.indexOf(day)].events.indexOf(event))
              break
              // this.events[day].events[event].description = null
            }
          });
        });
        this.getDay("friday")
        this.alertwindowservice.hide()
        // this.startLoad()
      },
      err => {
        alert('an error occurred')
      }
    );
  }

  displayEvent(description){
    if(description){
      this.alertwindowservice.showDataWithButton(description)
    }
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

  getOtherDays(element){
    let otherEvents = this.events.filter(e => e.day.toLowerCase() != element.day.toLowerCase())
    let eventString:Array<string> = []
    otherEvents.forEach(element => {
      eventString.push(element.day)
    })
    return eventString
  }

  getDay(day:string){
    window.scrollTo(0,0)
    this.events.forEach(element => {
      if (element.day.toLowerCase() == day.toLowerCase()){
        this.currentDay = day
        this.currentDate = element.date
        this.otherDays = this.getOtherDays(element)
        this.eventsByDay = element.events
      }
    });
  }


  pickDay(){
    switch(this.currentDay.toLowerCase()){
      case 'friday':
        this.getDay('saturday')
        break
      case 'saturday':
        this.getDay('sunday')
        break
      case 'sunday':
        this.getDay('friday')
        break
    }
  }

  nextDay(){
    this.alertwindowservice.showDataWithoutButton('')
    setTimeout(()=>{
      this.pickDay()
    }, 400)
    setTimeout(()=>{
      this.alertwindowservice.hide()
    }, 450)
  }

  ngOnInit() {
    this.getEvents(true)
    this.startLoad()
  }

}
