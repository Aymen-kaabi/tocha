import { Component, OnInit } from '@angular/core';
import { DeleveryService } from '../../services/delevery.service';
import { ClientUsersService } from "../../services/client-users.service"
import * as html2pdf from 'html2pdf.js'
@Component({
    selector: 'user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    arrClients: Array<any> =[];
    realClients: Array<any> =[];
    clients: Array<any> =[];
    products: Array<any> =[];
    data: Array<any> =[];
    constructor(private DeleveryService: DeleveryService , private service :ClientUsersService) { }
    ngOnInit() {
        this.DeleveryService.getLivraison().subscribe((data: any) => {
            this.data=data 
             for(var i=0 ; i<data.length ; i++) {
                 let objClient = {
                     delId:data[i].id,
                     status: data[i].status,
                     clientId: data[i].clientId,
                     clientName: data[i].clientName,
                     clientEmail: data[i].clientEmail,
                     clientNumber: data[i].clientNumber,
                     clientStreet: data[i].clientStreet,
                     clientCity: data[i].clientCity,
                     clientZip: data[i].clientZip,
                     date:data[i].createdAt,
                     total:0
                 }

                 this.clients.push(objClient)
                 console.log(this.clients)   
                 let objProd = {
                     delId:data[i].id,
                     clientId: data[i].clientId,
                     productId: data[i].productId,
                     productName: data[i].productName,
                     quantity: data[i].quantity,
                     price: data[i].price,
                    
                 }

                 this.products.push(objProd)
                 console.log(this.products)
                }  

                for(var i=0 ; i<this.clients.length;i++){
                    if(this.arrClients.indexOf(this.clients[i].clientId) === -1 ){
                        this.realClients.push(this.clients[i])
                        this.arrClients.push(this.clients[i].clientId)
                    }
                }
                console.log(this.realClients)   
                for(var j=0 ; j<this.realClients.length; j++ ){
                    for(var i=0 ; i<this.products.length; i++ ){
                   
                        if(this.products[i].clientId === this.realClients[j].clientId){
                            console.log(this.products[i].clientId)
                            console.log(this.realClients[j].clientId)
                            let total = Number(this.products[i].price) * this.products[i].quantity
                            console.log(Number(this.products[i].price))
                            console.log(this.products[i].quantity)
                            console.log(total)
                            this.realClients[j].total = this.realClients[j].total + total
                            console.log(this.realClients[j].total)
                        }
                    }
                }   
          })  
         
    }
    delete(id){
            for(var i=0; i<this.data.length ; i++){
              if( this.data[i].clientId === id ){
               let item = this.data[i].id
              
               this.DeleveryService.deleteLivraison(item).subscribe((data: any) => {
                console.log(data) 
              })
              this.products = this.products.filter((val,i)=>val.delId !== item)
              this.realClients=this.realClients.filter((val,i)=>val.delId !== item)
              this.data=this.data.filter((val,i) =>val.id !== item)
            }
        }   
    }
    save(name){

    // this.service.sendMsg(name).subscribe(() => {
    //     console.log("SMS send")
    // })   
     
    const options = {
        filename:`${name}.pdf`,
        image : {type: 'jpeg'},
        html2canvas:{},
        jsPDF:{orientation:'landscape'}
    }
    const content:Element = document.getElementById('element-to-export')
    html2pdf()
    .from(content)
    .set(options)
    .save()
  
    }
    
}
