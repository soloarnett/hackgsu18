import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { resetFakeAsyncZone } from '@angular/core/testing'
declare const qrcode: any

@Component({
  selector: 'app-qrtest',
  templateUrl: './qrtest.component.html',
  styleUrls: ['./qrtest.component.scss']
})
export class QrtestComponent implements OnInit {

  constructor(private http: HttpClient) { }
  userId: string = "8009f1ed-3d94-48bf-8da6-764ef4511947"

  user

  onFileChange(event) {
    try {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e: any) => {
        const data = e.target.result
        qrcode.callback = (res) => {
          console.log('res', res)
          switch(res){
            case 'error decoding QR Code':
            case 'Failed to load the image':
              console.log('notify user to take a better picture')
              break
            default:
              this.verifyQrCode(res)
          }
        }
        qrcode.decode(data)
      }
    } catch (e) {
      console.log('no file chosen')
    }
  }

  verifyQrCode(code) {
    let url = "https://aeb4oc6uwg.execute-api.us-east-1.amazonaws.com/prod/verifyqrcode"
    console.log('qr code value', code);
    let params = {
      body: {
        id: code,
      },
      headers: {
        "Content-Type": "application/json"
      }
    }
    this.http.post(url, params).toPromise().then(
      res => {
        if(res['body'] && res['body']['Item']){
          this.user = res['body']['Item']
          console.log(this.user)
        }
      },
      err => {
        console.log(err)
      }
    )
  }

  ngOnInit() {
  }

}
