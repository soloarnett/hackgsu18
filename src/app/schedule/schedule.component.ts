import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { HttpRequest } from 'selenium-webdriver/http';

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
  events//:Array<Object>
  eventsByDay
  otherEvents

  
  constructor(private http:HttpClient
  ) { }

  getEvents(byDay){
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
        // this.result = res
        // console.log(this.result)
        this.events = res 
        this.getDay("friday")
        // this.getDay("FRIday")
        // console.log(this.events)
        // console.log(res.toString())
        // console.log
        // console.log(typeof(res));
        // console.log(res.valueOf())
        // console.log(res.constructor)
      },
      err => {
        alert('an error occurred')
      }
    );
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
    this.events.forEach(element => {
      if (element.day.toLowerCase() == day.toLowerCase()){
        this.currentDay = day
        this.currentDate = element.date
        console.log(element)
        this.otherDays = this.getOtherDays(element)
        this.eventsByDay = element.events
        // console.log(this.otherEvents)
      }
    });
  }

  ngOnInit() {
    this.getEvents(true)
    // // this.getDay("friday")
    // this.currentDay = "Friday"
    // this.otherDays.push("Saturday")
    // this.otherDays.push("Sunday")
    // this.currentDate = "03.23"
  }

}
