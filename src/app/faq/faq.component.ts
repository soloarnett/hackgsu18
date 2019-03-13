import { AlertWindowService } from './../alert-window.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-faq',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faq: object;
  getFaq() {
    if (localStorage['faq'] && localStorage['faq'].length > 0) {
      try {
        this.faq = JSON.parse(localStorage['faq'])
      } catch (e) {
        // no stored faq
      }
    }
    this.aws.showDataWithoutButton('Just a sec...')
    let url = "https://aeb4oc6uwg.execute-api.us-east-1.amazonaws.com/prod/getfaq"
    return $.ajax({
      url: url,
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Content-Type', 'application/json');
      },
      method: "GET",
    }).done((data) => {
      this.aws.hide()
      console.log(data)
      localStorage['faq'] = JSON.stringify(data.body)
      this.faq = data.body
    })
  }
  loaded: boolean = false;
  pageLoading: boolean = false;

  toggleLoad() {
    this.loaded = this.loaded ? false : true
    console.log('load toggled')
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

  constructor(private aws: AlertWindowService) { }

  ngOnInit() {
    this.getFaq().then(() => {
      this.startLoad()
    })

  }

}
