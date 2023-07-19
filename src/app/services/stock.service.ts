import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { StockDetails } from '../models/StockDetails';
import { StockDetailsResponse } from '../models/StockDetailsResponse';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  baseUrl = environment.apiUrl;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  constructor(private httpclient: HttpClient) { }

  public addStock(stock:StockDetails): Observable<any> {
    return this.httpclient.post<any>(this.baseUrl + 'stock/add', stock);
  }

  public getStockDetailsByDate(companyCode: string, startDate: Date, endDate: Date): Observable<StockDetailsResponse> {
    return this.httpclient.get<StockDetailsResponse>(this.baseUrl + 'stock/get/' + companyCode + '/' + startDate + '/' + endDate);
  }
}
