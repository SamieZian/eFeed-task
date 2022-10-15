import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PincodeService {

  constructor(private http:HttpClient) { }

  public findPincodeState(pincode:any):any{
    let url = `https://api.postalpincode.in/pincode/${pincode}`;
    return this.http.get(url);
  }
}
