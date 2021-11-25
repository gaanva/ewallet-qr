import { Component } from '@angular/core';
import { DeviceCodeFlowService } from './services/QR/device-code-flow.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public values: string = null;
  public level: "L" | "M" | "Q" | "H";
  public width: number;
  public userCode:string = null;
  public deviceCode:string = null;
  public token: string = null;
  public payment:string;

  constructor(private deviceCF:DeviceCodeFlowService) {
    this.level = "L";
    this.values = "QR Code URL.";
    this.width = 200;

    
  }

  qrLevel(val: "L" | "M" | "Q" | "H") {
    this.level = val;
  }

  qrData(val: string) {
    this.values = val;
  }

  qrWidth(val: number) {
    this.width = val;
  }

  async startdeviceFlow(){
    console.log('starting DCF')
    this.deviceCF.getQRCodeURL().subscribe(
      (response) => {
        console.log('finishing DCF')
        console.log(JSON.stringify(response.r));
        this.userCode =response.r.user_code;
        this.deviceCode = response.r.device_code;
        this.values = response.r.verification_uri_complete;
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
    });
  }

  async getToken(){
    this.deviceCF.obtainToken(this.deviceCode).subscribe(
      (response) => {
        console.log('finishing REQUESTING tokens');
        console.log(JSON.stringify(response));
        this.token = JSON.stringify(response);
        //this.values = response.r.verification_uri_complete;
      },
      err => {
          console.log("get token error", err);
          
      },
      () => {
          console.log("The POST observable is now completed.");
    });
  }


  //once the token is received, then trigger the payment agains the ewallet API.
  async makePayment(){
    this.deviceCF.makeAPayment(this.token).subscribe(
      (response) => {
        console.log('respuesta del payment endpoint: ' + JSON.stringify(response));
        this.payment = JSON.stringify(response);
      },
      (error) => {
        console.error(error);
        alert("error making the payment " + error);
      }
    );
  }
    
}
