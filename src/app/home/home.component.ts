import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  actionGroupActions:Array<string> = [
    // Registration Link
    "http://goo.gl/ESF8Mj",
    //Volunteer Link
    // "https://hackgsuspring2018.typeform.com/to/Jxrdks",
    // Sponsor Us Link
    "http://sponsors.hackgsu.com/hackGSU_Sponsorship_packet.pdf",
    // FAQ Link
    "#faq",
    // Travel Reimbursment Link
    "https://hackgsuspring2018.typeform.com/to/EM26kg",
    // "#"
  ];

  subGroupActions:Array<string> = [
    "mailto:hackathon@cs.gsu.edu",
    // slack
    // "https://goo.gl/ByrTkF",
    "https://hackgsuspring18.slack.com/join/shared_invite/enQtMzAwNjE2Mjc4MzU2LTA4MDc3NGRjODA5MWNmNzM5NWRjYjczYWE3ZmY4Y2M2NTdlMzQyOWE1Mzk0Mzk3YTBmODA1MTA2MTY1ODUwOGY",
    // "#",
    // google form registration
    "https://goo.gl/forms/Pimkr6twZ2Q2YoJ52",
    // "#"
  ]
  constructor() { }

  ngOnInit() {
  }

}
