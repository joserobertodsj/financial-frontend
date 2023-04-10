import { ChangeDetectorRef, Component } from '@angular/core';
import { ICustomer } from 'src/app/interfaces/customers';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  customers: ICustomer[] = [];
  constructor(private customersService: CustomersService, private cd: ChangeDetectorRef){}

  findAllCustomers(){
    this.customersService.findAllCustomers().subscribe((result:ICustomer[])=>{
      this.customers = result;
    })
  }

  deleteCustomer(documentNumber: String){
    Swal.fire({
      title: `Deseja remover o cliente de CPF ${documentNumber} ?`,
      showCancelButton: true,
      confirmButtonText: 'Remover',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.customersService.deleteCustomer(documentNumber).subscribe(result =>{
          Swal.fire('Removido com sucesso!')
          this.findAllCustomers();
        }, error =>{
          Swal.fire({
            icon: 'error',
            title: 'Erro ao remover o cliente!'
          })
          console.error(error);
        })
      }
    })
  }

  ngOnInit(){
    this.findAllCustomers();
  }

}
