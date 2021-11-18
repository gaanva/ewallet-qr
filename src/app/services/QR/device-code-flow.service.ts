import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceCodeFlowService {
  private bckndUrl = "https://ewallet-bcknd.herokuapp.com";
  //private bckndUrl = "http://localhost:3010";
  constructor(private http: HttpClient) { 

  }
  /*
  Este metodo como respuesta me daria esto:
  {
  "device_code": "Ag_EE...ko1p",
  "user_code": "QTZL-MCBW",
  "verification_uri": "https://accounts.acmetest.org/activate",
  "verification_uri_complete": "https://accounts.acmetest.org/activate?user_code=QTZL-MCBW",
  "expires_in": 900,
  "interval": 5
}
  */
  getQRCodeURL(){
    
    //configurar las llamadas al Authserver para poder obtener la URL con el device code correspondiente.
    const headers = new HttpHeaders();
    //headers.set("Content-Type", "application/x-www-form-urlencoded");
    //headers.set("Content-Type", "application/x-www-form-urlencoded");//application/json
    headers.set("Content-Type", "application/json");
    //headers.set("Access-Control-Allow-Origin", "http://localhost:4200");
    //headers.set("Access-Control-Allow-Headers", "*");
    //headers.set("Access-Control-Request-Method", "POST");
    //headers.set("Cross-Origin-Resource-Policy", "cross-origin");

    const data= {"client_id": 'I78jUikVML0PzkMCLxzUycY29pwlWo4c', "scope": 'pagar:qr', "audience": 'https://my-ewallet.com'};
    
    /*const client_id = "I78jUikVML0PzkMCLxzUycY29pwlWo4c";
    const scope = "https://my-ewallet.com";
    const audience =  "pagar:qr";
    const data = `client_id=${client_id}&scope=${scope}&audience=${audience}`;*/
    
    return this.http.get<any>(this.bckndUrl+"/getQrCode");
    //return this.http.get<any>("http://localhost:3010/getQrCode");
    //return this.http.post<any>("https://gav-test.us.auth0.com/oauth/device/code", data, {headers});
  }

  /*
  * just for testing purposes, simulating the auto-call from the server side obtaining the token
  * once the user authorized and authenticated the device.
  */
  obtainToken(deviceCode:string){
    console.log(deviceCode);
    return this.http.get<any>(this.bckndUrl + "/getDeviceToken?device_code="+deviceCode);
  }
}
