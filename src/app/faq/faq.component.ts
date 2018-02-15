import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-faq',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faq:object;
  getFaq(){
    let url = "http://hackgsu.com/api/faq"
    return $.ajax({
      url: url,
      beforeSend:(xhr)=>{
        xhr.setRequestHeader('Content-Type', 'application/json');
      },
      method: "GET",
    }).done((data)=>{
      // console.log(data);
      // let response:object = data;
      this.faq = JSON.parse(data);
      // console.log(typeof(result));
      
      // this.faq.forEach(element => {
      //   console.log(element);
      // });
      // console.log(typeof(data));
    })
  }

  constructor() { }

  ngOnInit() {
    this.getFaq()
  }

}
