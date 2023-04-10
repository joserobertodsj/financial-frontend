import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { ICustomer } from '../interfaces/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  endpoint = 'customers';
  api = environment.api;
  constructor(private http: HttpClient) { }


  //chamadas http

  findAllCustomers(){
    return this.http.get<ICustomer[]>(`${this.api}/${this.endpoint}`);
  }

  findByDocumentNumber(documentNumber: String){
    return this.http.get<ICustomer>(`${this.api}/${this.endpoint}/${documentNumber}`);
  }

  createCustomer(customer: ICustomer){
    return this.http.post(`${this.api}/${this.endpoint}`, customer);

  }

  updateCustomer(documentNumber: String, customer: ICustomer){
    return this.http.put(`${this.api}/${this.endpoint}/${documentNumber}`, customer);
  }

  deleteCustomer(documentNumber: String){
    return this.http.delete(`${this.api}/${this.endpoint}/${documentNumber}`)
  }
}
