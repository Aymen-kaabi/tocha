import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service"
import { CompanyUsersService } from "../../services/company-users.service"
import { ClientUsersService } from "../../services/client-users.service"
@Component({
  selector: 'products-app',
  templateUrl: 'products.component.html',
  styleUrls: ['./products.component.scss']

})

export class ProductsComponent implements OnInit {
  ClientsFollowers: Number = 0;
  CompanyFollowers: Number = 0;
  Productslength: Number = 0;
  realClients: Array<any> = [];
  realCompanies: Array<any> = [];
  realProducts: Array<any> = [];
  products: Array<any> = [];
  constructor(private service: ProductsService, private service2: CompanyUsersService, private service3: ClientUsersService) { }

  ngOnInit() {
    this.service.getProducts().subscribe((data: any) => {
      this.products = data;
      console.log(data);
    });
    this.service.getInsertedProducts().subscribe((data: any) => {
      this.realProducts = data;
      this.Productslength = this.realProducts.length
      console.log(data);
    });
    this.service2.getAllCompanyUsers().subscribe((data: any) => {
      this.realCompanies = data;
      this.CompanyFollowers = this.realCompanies.length
      console.log(data);
    });
    this.service3.getAllClientUsers().subscribe((data: any) => {
      this.realClients = data;
      this.ClientsFollowers = this.realClients.length
      console.log(data);
    })
  }
  addProducts(data) {
    this.service.addProducts(data).subscribe((res) => {
      console.log(res)
    },
      (error) => {
        console.log(error)
      })
      this.service.deleteOneProduct(data.id).subscribe((res) => {
        document.getElementById("myText").innerHTML = res;
      },
        (error) => {
          console.log(error);
        });
        this.products = this.products.filter((product) =>product.id !== data.id )
    }
  

  deleteOne(id) {
    console.log(id)
    this.products = this.products.filter((product,i) => product.id !== id )
    this.service.deleteOneProduct(id).subscribe((res) => {
      document.getElementById("myText").innerHTML = res;
    },
      (error) => {
        console.log(error);
      })
      
  }
}
