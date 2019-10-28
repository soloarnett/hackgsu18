import { HttpClient } from '@angular/common/http';
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
  faq: any;
  getFaq() {
    if (localStorage['faq'] && localStorage['faq'].length > 0) {
      try {
        this.faq = JSON.parse(localStorage['faq'])
      } catch (e) {
        // no stored faq
      }
    }
    this.aws.showDataWithoutButton('Just a sec...')
    const url = "https://k2yeej6r24.execute-api.us-east-1.amazonaws.com/dev/getfaqs"
    const params = {
      hackathonId: 'e3df05aa15054a1706eb455341221e7a'
    };
    return this.http.post(url, params).toPromise()
      .then(res => {
        this.aws.hide()
        console.log(res)
        localStorage['faq'] = JSON.stringify(res['body'])
        this.faq = res['body']
      })
      .catch(err => {
        console.log('err', err);
        alert('unable to get faq');
      });
    // return $.post(url, { body: params }).promise()

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

  constructor(private aws: AlertWindowService, private http: HttpClient) { }

  ngOnInit() {
    this.getFaq().then(() => {
      this.startLoad()
    })

  }

}
