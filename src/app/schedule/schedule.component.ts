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
  currentDay = {
    date: '',
    weekday: '',
    index: 0,
    pretty: ''
  }
  otherDays = {
    date: [],
    weekday: [],
    index: {},
  }
  otherDaysWeekday = {}
  events = {}
  eventsByDay
  otherEvents
  schedule
  day
  days

  weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']



  alertActive: boolean = true
  alertVisible: boolean = true

  constructor(private http: HttpClient, private alertwindowservice: AlertWindowService) {
    alertwindowservice.alertActiveState$.subscribe(
      (alertActiveState: boolean) => {
        this.alertActive = alertActiveState
      }
    )

    alertwindowservice.alertVisibleState$.subscribe(
      (alertVisibleState: boolean) => {
        this.alertVisible = alertVisibleState
      }
    )
  }

  getEvents(byday?) {
    const url = 'https://k2yeej6r24.execute-api.us-east-1.amazonaws.com/dev/getschedulebyhackathon'
    const params = {
      hackathonId: 'e3df05aa15054a1706eb455341221e7a'
    }
    this.http.post(url, params).toPromise().then(
      response => {
        this.schedule = response['schedule']
        this.days = Object.keys(this.schedule.days).sort();
        this.days.forEach(day => {
          // grab the events from the schedule for each day and push them to an object that has the array of events assigned to a day
          // this.events.push(Object.values(this.schedule.days[day].events))
          let daySplit = day.split('-')
          let weekday = day
          if(daySplit[2].length < 2){
            console.log('daysplit', daySplit)
            weekday = daySplit[0] + '-' + daySplit[1] + '-' + '0'+ daySplit[2]
          }
          this.events[day] = {
            weekday: this.weekdays[new Date(weekday).getDay()],
            events: Object.values(this.schedule.days[day].events).sort((a,b) => {
              return a['order'] - b['order']
            })
          }
        });
        this.getDay(this.days[0]);
        // const events = this.schedule.days[this.day].events
        // console.log('schedule days', this.schedule.days)
        // console.log('events', events)

        // this.events = Object.values(events).sort((a, b) => {
        //   return a['order'] - b['order']
        // })
        // console.log('events', this.events)
      }
    ).catch(err => {
      console.log('err', err)
      // alert(JSON.stringify(err))
    })
  }

  // getEvents(byDay) {
  //   this.alertwindowservice.showDataWithoutButton('Just a moment...<br><br>Gathering all events')
  //   let url = "https://aeb4oc6uwg.execute-api.us-east-1.amazonaws.com/prod/getevents"
  //   const display = () => {
  //     this.events.forEach(day => {
  //       console.log(day)
  //       day.events.forEach(event => {
  //         switch (event.title.toLowerCase()) {
  //           case 'lunch':
  //           case 'dinner':
  //           case 'snack':
  //           case 'breakfast':
  //             let theseEvents = this.events
  //             let thisDay = theseEvents[theseEvents.indexOf(day)]
  //             let thisEvent = thisDay.events[thisDay.events.indexOf(event)]
  //             thisEvent.description = null;
  //             // console.log(thisDay)
  //             // console.log(this.events[this.events.indexOf(day)].events.indexOf(event))
  //             break
  //           // this.events[day].events[event].description = null
  //         }
  //       });
  //     });
  //     this.getDay("friday")
  //     this.alertwindowservice.hide()
  //   }
  //   if (localStorage['schedule'] && localStorage['schedule'].length > 0) {
  //     try {
  //       this.events = JSON.parse(localStorage['schedule'])
  //       display()
  //     } catch (e) {
  //       // no stored schedule
  //     }
  //   }
  //   let request = this.http.request("POST", url, {
  //     body: {
  //       byDay: byDay ? true : false
  //     },
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).subscribe(
  //     res => {
  //       this.events = res
  //       localStorage['schedule'] = JSON.stringify(this.events)
  //       console.log(this.events)
  //       display()
  //       // this.startLoad()
  //     },
  //     err => {
  //       alert('an error occurred')
  //     }
  //   );
  // }

  displayEvent(description) {
    if (description) {
      this.alertwindowservice.showDataWithButton(description)
    }
  }

  loaded: boolean = false;
  pageLoading: boolean = false;

  toggleLoad() {
    this.loaded = this.loaded ? false : true
  }

  loadInOutAnimation() {
    return (this.loaded ? 'active' : 'inactive') + ' ' + (this.pageLoading ? 'loading' : 'notLoading')
  }

  startLoad() {
    this.pageLoading = true
    setTimeout(() => {
      this.loaded = true
    }, 50)

    setTimeout(() => {
      this.stopLoad()
    }, 450)
  }

  stopLoad() {
    this.pageLoading = false
  }

  // getOtherDays(element) {
  //   let otherEvents = this.events.filter(e => e.day.toLowerCase() != element.day.toLowerCase())
  //   let eventString: Array<string> = []
  //   otherEvents.forEach(element => {
  //     eventString.push(element.day)
  //   })
  //   return eventString
  // }

  getDay(date: string) {
    $('#schedule').parent().animate({scrollTop: 0}, 'slow')
    // this.events.forEach(element => {
    //   if (element.day.toLowerCase() == day.toLowerCase()) {
    //     this.currentDay = day
    //     this.currentDate = element.date
    //     this.otherDays = this.getOtherDays(element)
    //     this.eventsByDay = element.events
    //   }
    // });
    let daySplit = date.split('-')
    let weekday = date
    if(daySplit[2].length < 2){
      console.log('daysplit', daySplit)
      weekday = daySplit[0] + '-' + daySplit[1] + '-' + '0'+ daySplit[2]
    }
    const dayOb = this.schedule.days[date];
    const dayArr = Object.values(this.schedule.days[date].events).sort((a, b) => {
      return a['order'] - b['order'];
    });
    
    this.currentDay.date = date

    
    this.currentDay.weekday = this.weekdays[new Date(weekday).getDay()];
    this.currentDay.index = this.days.indexOf(this.currentDay.date)

    this.currentDay['split'] = this.currentDay.date.split('-')
    this.currentDay['year'] = this.currentDay['split'][0]
    this.currentDay['month'] = this.currentDay['split'][1]
    this.currentDay['day'] = this.currentDay['split'][2]
    this.currentDay['pretty'] = 'Nov ' + this.currentDay['day']

    this.eventsByDay = dayArr;
    this.otherDays.date = this.days.filter(selectedDay => {
      return selectedDay !== date;
    });
    this.otherDays.weekday = []
    this.otherDays.date.forEach(day => {
      let daySplit = day.split('-')
      if(daySplit[2].length < 2){
        day = daySplit[0] + '-' + daySplit[1] + '-' + '0'+ daySplit[2]
      }
      this.otherDays.weekday.push(this.weekdays[new Date(day).getDay()])
    })
    console.log(typeof(this.otherDays.weekday), this.otherDays.weekday)
    for (let i = this.otherDays.date.length - 1; i >= 0; i--) {
      this.otherDays.index[this.otherDays.date[i]] = {}
      this.otherDays.index[this.otherDays.date[i]]['i'] = i
      this.otherDays.index[this.otherDays.date[i]].weekday = this.otherDays.weekday[i]
      console.log('otherdays weekday', this.otherDays.weekday[i])
      // this.otherDays.index[this.otherDays.date[i]]['weekday'] = this.otherDays.weekday[i]
      // this.otherDaysWeekday[this.otherDays.date[i]] =m
      this.otherDays.index[this.otherDays.date[i]]['split'] = this.otherDays.date[i].split('-')
      this.otherDays.index[this.otherDays.date[i]]['year'] = this.otherDays.index[this.otherDays.date[i]].split[0]
      this.otherDays.index[this.otherDays.date[i]]['month'] = this.otherDays.index[this.otherDays.date[i]].split[1]
      this.otherDays.index[this.otherDays.date[i]]['day'] = this.otherDays.index[this.otherDays.date[i]].split[2]
      this.otherDays.index[this.otherDays.date[i]]['pretty'] = 'Nov ' + this.otherDays.index[this.otherDays.date[i]]['day']
      
      // this.otherDays.index['weekday'] = this.otherDays.weekday[i]
    }


    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100);
  }


  pickDay(date) {
    this.alertwindowservice.showDataWithoutButton('')
    $('#schedule').parent().animate({scrollTop: 0}, 'slow')
    setTimeout(() => {
      this.getDay(date);
    }, 400)
    setTimeout(() => {
      this.alertwindowservice.hide()
    }, 450)
  }

  nextDay() {
    this.alertwindowservice.showDataWithoutButton('')
    $('#schedule').parent().animate({scrollTop: 0}, 'slow')
    setTimeout(() => {
      if((this.currentDay.index + 1) >= this.days.length){
        this.getDay(this.days[0])
      }else{
        this.getDay(this.days[this.currentDay.index + 1])
      }
      // this.getDay(this.otherDays.date[0])
    }, 400)
    setTimeout(() => {
      this.alertwindowservice.hide()
    }, 450)
  }

  ngOnInit() {
    this.alertwindowservice.hide();
    // this.getEvents(true)
    this.getEvents()
    this.startLoad()
  }

}
