import { Directive, Component, OnInit, Output } from '@angular/core';
import { PurchaseService } from '../services/purchase.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { NgbdModalComponent } from '../modal/modal.component';
import { NgbdModalContent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPurchaseComponent } from '../modal-purchase/modal-purchase.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})

export class ShoppingCartComponent implements OnInit {
  selected: Array<any> =[];
  purchases: Array<any> =[];
  products: Array<any> =[];
  results: Array<any> =[];
  livraisons: Array<any> =[];
  user: any;
  // count:number=0;
  total:number=0;
  item : any ;
  constructor( private PurchaseService:PurchaseService,private server: ProductService, private router: Router,private modalService: NgbModal) { }
 
  ngOnInit(): void {
    this.user = JSON.parse(window.localStorage.getItem('id'));
    this.PurchaseService.getPurchase(this.user).subscribe((data: any) => {
      console.log(data)
      for(var i=0 ; i<data.length; i++){
         if(this.user === data[i].clientId){
           this.purchases.push(data[i])
          console.log(this.purchases)
      } 
    }
    for(var i=0 ; i<this.purchases.length; i++){
      let id = this.purchases[i].productId
      if(this.selected.includes(id) === false ){
      console.log(this.purchases[i].productId)
      this.selected.push(id)
      this.server.getById(id).subscribe((data:any) => {
      this.products.push(data)
       })
      }
    }
    console.log(this.products)
    })
    

  }
  changed(value,item){
    console.log(item)
    console.log(value)
  for(var i = 0; i < this.products.length; i++){

    if(item.id === this.products[i].id){
      let count = value
      let result=this.products[i].newPrice * count
      console.log(result)
      if(typeof(this.results[i]) === 'number'){
        this.results[i]=result
      }else
      this.results.push(result)
     this.total = 0 ;
      console.log(this.results)
    }
  }
  
  for(var i=0; i<this.results.length; i++){
    this.total = this.total + this.results[i]
  }
  console.log(this.purchases)
  console.log(this.products)
  console.log(this.results)
  console.log(this.total)
}
 
    
  confirm(){
    if(this.total > 0){
      Swal.fire({
        text: "your purchases is succsesfuly confirmed",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        confirmButtonColor: '#fbc658',
      })
     // alert("your purchases is succsesfuly confirmed")
    }else {
      this.router.navigateByUrl('/landing');
    }
  }
  clear(id){
    for(var i=0; i<this.purchases.length; i++){
      if(this.purchases[i].productId===id){
         this.item = this.purchases[i].id
      }
    }
    this.PurchaseService.deleteOne(this.item).subscribe((data: any) => {
      console.log(data)
  })
  this.products = this.products.filter((val,i)=>val.id !== id)
  console.log(this.products)
  }
  clearAll(){
    this.PurchaseService.deleteAll().subscribe((data: any) => {
      console.log(data)
  })
  this.products = []
  }
  open() { 
    for (var i=0 ; i<this.products.length ; i++) {
      let obj = {
        status:"not yet",
        clientName:JSON.parse(JSON.stringify(window.localStorage.getItem('firstName')))+' '+JSON.parse(JSON.stringify(window.localStorage.getItem('lastName'))) ,
        clientId:JSON.parse(window.localStorage.getItem('id')),
        clientEmail:JSON.parse(JSON.stringify(window.localStorage.getItem('email'))),
        clientNumber:JSON.parse(window.localStorage.getItem('phoneNumber')),
        clientStreet:JSON.parse(JSON.stringify(window.localStorage.getItem('street'))),
        clientCity:JSON.parse(JSON.stringify(window.localStorage.getItem('city'))),
        clientZip:JSON.parse(window.localStorage.getItem('zipCode')),
        productId:this.products[i].id,
        productName:this.products[i].name,
        price:this.products[i].newPrice,
        quantity:this.results[i]/this.products[i].newPrice
      }
      this.livraisons.push(obj)
    }
    console.log(this.livraisons)
    let item = this.livraisons
    let total = this.total
    const modalRef = this.modalService.open(ModalPurchaseComponent);
    console.log(modalRef)
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.total = total;
    // console.log(modalRef.componentInstance.item)
    // modalRef.result.then((result) => {
    //   if (result) {
    //     console.log(result);
    //   }
    // });
     this.livraisons=[] 
  }
  
}

