import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { CompanyResponse } from '../models/CompanyResponse';
import { Company } from '../models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseUrl = environment.apiUrl;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  companyCodes = new BehaviorSubject<string[]>([]);
  companyDetails = new BehaviorSubject<CompanyResponse[]>([]);
  company = new BehaviorSubject<CompanyResponse>(new CompanyResponse());

  constructor(private httpclient: HttpClient) { }

  getCompanyCodeList = this.companyCodes.asObservable();

  getCompanyDetails = this.companyDetails.asObservable();

  getCompany = this.company.asObservable();

  setCompanyCodeList() {
    this.getCompanyCodes().subscribe(data => {
      this.companyCodes.next(data);
    });
  }

  setAllCompanyDetails() {
    this.getAllCompanies().subscribe(data => {
      this.companyDetails.next(data);
    });
  }

  setCompany(companyCode: string) {
    this.getCompanyByCode(companyCode).subscribe(data => {
      this.company.next(data);
    });
  }

  public getCompanyCodes(): Observable<string[]>{
    return this.httpclient.get<string[]>(this.baseUrl + 'company/getCompanyCode');
  }

  public getAllCompanies():Observable<CompanyResponse[]>{
    return this.httpclient.get<CompanyResponse[]>(this.baseUrl + 'company/getall');
  }

  public getCompanyByCode(companyCode: string): Observable<CompanyResponse>{
    return this.httpclient.get<CompanyResponse>(this.baseUrl + 'company/info/' + companyCode);
  }

  public registerCompany(company: Company): Observable<Company>{
    return this.httpclient.post<any>(this.baseUrl + 'company/register', company, this.headers);
  }
}
