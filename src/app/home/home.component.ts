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
    "#registration",
    //Volunteer Link
    "https://hackgsuspring2018.typeform.com/to/Jxrdks",
    // FAQ Link
    "#faq",
    // Travel Reimbursment Link
    // "https://hackgsuspring2018.typeform.com/to/EM26kg",
    "#"
  ];

  subGroupActions:Array<string> = [
    "mailto:hackgsu@gmail.com",
    // slack
    "https://join.slack.com/t/hackgsuspring2018/shared_invite/enQtMjk3NjU4NDA3Njk4LTNjOWU5MDExZDkxMDIzZDQ3ZTYyYjA4NDY3ZjBmZWI2ZjI0OWNhYTlkYWJiNjY0MWFlNmI3MzZkZTAzZDdkMzM",
    // google form registration
    // "https://goo.gl/forms/wKNQA7wUcHkagtSQ2",
    "#"
  ]
  constructor() { }

  ngOnInit() {
  }

}
