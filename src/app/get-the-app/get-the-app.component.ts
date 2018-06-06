import { Component, OnInit } from '@angular/core';
import { AlertWindowService } from '../alert-window.service';

@Component({
  selector: 'app-get-the-app',
  templateUrl: './get-the-app.component.html',
  styleUrls: ['./get-the-app.component.scss']
})
export class GetTheAppComponent implements OnInit {

  closed:boolean = true
  manualSystem:string
  showManual:boolean = false
  closeDownloadButton(){
    localStorage.setItem('downloadButtonClosed', JSON.stringify({isClosed:true}))
    this.closed = true
  }

  getMobileOperatingSystem() {
    if(this.manualSystem && this.manualSystem.length > 0){
      return this.manualSystem
    }else{
      var userAgent = navigator.userAgent || navigator.vendor
  
        // Windows Phone must come first because its UA also contains "Android"
      if (/android/i.test(userAgent)) {
          return "android";
      }else if (/iPad|iPhone|iPod/.test(userAgent)) {
          return "ios";
      }
      return null;
    }
  }

  downloadAndroid(){
    this.manualSystem = 'android'
    this.downloadLink()
  }

  downloadIos(){
    this.manualSystem = 'ios'
    this.downloadLink()
  }

  downloadLink(){
    let operating = this.getMobileOperatingSystem()
    try{
      if(operating == 'ios'){
        window.location.href = "https://itunes.apple.com/us/app/hackgsu-spring-2018/id1354858163?ls=1&mt=8"
        this.showManual = false
        this.manualSystem = null
        this.closeDownloadButton()
      }else if(operating == 'android'){
        window.location.href = "https://play.google.com/store/apps/details?id=com.hackgsu.app"
        this.showManual = false
        this.manualSystem = null
        this.closeDownloadButton()
      }else{
        this.showManual = true
        // console.log('show manual 1')
      }
    }catch(e){
      this.showManual = true
      // console.log('show manual 2')
    }
  }
  constructor(private alertwindowservice:AlertWindowService) { }

  
  ngOnInit() {
    try{
      if(!localStorage.getItem('pushUID')){
        this.closed = JSON.parse(localStorage.getItem('downloadButtonClosed'))
        // localStorage.clear()
      }else{
        this.closed = true
      }
    }catch(e){
      this.closed = false
    }
  }

}
