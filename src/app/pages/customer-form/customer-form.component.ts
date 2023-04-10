import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from 'src/app/interfaces/customers';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {

  customerDocumentNumber: String = "";
  isNewCustomer: Boolean = false; //ele converte um valor não booleano para um valor booleano


  customerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    documentNumber: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    monthlyIncome: new FormControl(0, Validators.required),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required)
    })

  })

  constructor(private customersService: CustomersService, private route: ActivatedRoute, private router: Router){}
  createCustomer(){
    const customer: ICustomer = this.customerForm.value as ICustomer;
    this.customersService.createCustomer(customer).subscribe(result =>{
      Swal.fire('Cadastrado com sucesso!').then((result) => this.router.navigate(['/customers']))
    }, error =>{
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar o cliente!'
      })
      console.error(error);
    })
  }

  updateCustomer(){
    const customer: ICustomer = this.customerForm.value as ICustomer;
    this.customersService.updateCustomer(customer.documentNumber, customer).subscribe(result =>{
      Swal.fire('Cliente atualizado!').then((result) => this.router.navigate(['/customers']))
    }, error =>{
      Swal.fire({
        icon: 'error',
        title: 'Erro ao atualizar o cliente!'
      })
      console.error(error);
    })
  }


  ngOnInit(){
    this.customerDocumentNumber =  this.route.snapshot.paramMap.get('documentNumber') ?? ""; //nullish coalesce -- se a expressão da esuquerda for nula, usa a da direita
    this.isNewCustomer = this.customerDocumentNumber == "";
    if(this.customerDocumentNumber){
      this.customersService.findByDocumentNumber(this.customerDocumentNumber).subscribe((customer: ICustomer) =>{
        this.customerForm.setValue({
          name: customer.name,
          documentNumber: customer.documentNumber,
          phoneNumber: customer.phoneNumber,
          monthlyIncome: customer.monthlyIncome,
          address:{
            street: customer.address.street,
            number: customer.address.number,
            zipCode: customer.address.zipCode
          }
        })
      })
    }

  }


}
