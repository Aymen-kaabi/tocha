import { Component, Output } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LivraisonService } from '../services/livraison.service'
import { PurchaseService } from '../services/purchase.service';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-purchase',
  template: ` <div class="test" id="modal-dialog" tabindex="-1" role="dialog" aria-labelledby="modalIdLabel">
  <div class="modal-header" id="modalSocial">
  <h3 class="modal-title text-center">Purchanse</h3>
  <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
        </button>      
</div>    
<div class="modal-body"> 
<table style =" font-family: arial, sans-serif;
border-collapse: collapse;
width: 100%;">
    <tr style=" background-color: #dddddd;">
      <th style="  border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;"> Quantity </th>
      <th style="  border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;"> 
      Product's Name </th>
      <th style="  border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;">Price</th>
    </tr>
    <tr style="background-color: #dddddd;" *ngFor="let i of item" >
      <td style="border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;"> 
       {{i.quantity}} 
      </td>
      <td style="border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;">
      {{i.productName}} 
      </td>
      <td style="border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;">
      {{i.price}} Dt
      </td>
    <tr>
    
  </table>
</div>
<div class="total"> <h3> Total : {{total}} Dt</h3></div>
<div class="modal-footer">
<div class="left-side">
    <button type="button" class="btn btn-default btn-link" (click)="activeModal.close('Close click')"> Cancel </button>
</div>
<div class="divider"></div>
<div class="right-side">
    <button type="button" class="btn btn-danger btn-link" (click)="confirm(item)">Confirm purchase</button>
</div>
</div>
`

})

export class ModalPurchaseComponent {
  array: Array<any> = [];
  products: Array<any> = [];
  newQuantity: number = 0;
  q: number = 0;
  total: number = 0;
  item: any;
  constructor(public activeModal: NgbActiveModal, private LivraisonService: LivraisonService, private PurchaseService: PurchaseService, private ProductService: ProductService) { }
  ngOnInit() {
    this.ProductService.getProducts().subscribe((data: any) => {
      this.products = data
      console.log(this.products)
    })
  }
  confirm(item) {
    
    console.log(item)
    this.array=item
    for (var i = 0; i < this.array.length; i++) {
      let data = {
        status: this.array[i].status,
        clientName: this.array[i].clientName,
        clientId: this.array[i].clientId,
        clientEmail: this.array[i].clientEmail,
        clientNumber: this.array[i].clientNumber,
        clientStreet: this.array[i].clientStreet,
        clientCity: this.array[i].clientCity,
        clientZip: this.array[i].clientZip,
        productId: this.array[i].productId,
        productName: this.array[i].productName,
        price: this.array[i].price,
        quantity: this.array[i].quantity,
      }
     
      console.log(data)
      this.LivraisonService.addLivraison(data).subscribe((res) => {
        console.log(res);
      },
        (error) => {
          console.log(error);
        })
       
      for (var j = 0; j < this.products.length; j++) {
        if (this.products[j].id === this.array[i].productId) {  
          this.newQuantity = this.products[j].quantity - this.array[i].quantity
        }
        if (this.newQuantity > 0) {
          this.q = this.newQuantity
        } else if (this.newQuantity = 0) {
          this.q = 0
        }
        this.ProductService.updateQuantity(this.q, this.array[i].productId).subscribe((res) => {
          console.log(res);
        },
          (error) => {
            console.log(error);
          }) 
      }
    }
    this.PurchaseService.delete().subscribe((res) => {
    },
      (error) => {
        console.log(error);
      })
      
     // Swal.fire("thank you for buying from bekhtef , you will receive a notification on your phone number ")
      
      Swal.fire({
        text: "thank you for buying from bekhtef , you will receive a notification on your phone number",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        confirmButtonColor: '#fbc658',
      }).then(()=>
      window.location.reload()
      )
      
  }
  
}

