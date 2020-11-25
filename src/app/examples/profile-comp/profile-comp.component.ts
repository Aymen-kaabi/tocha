import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import {
    AngularFireStorage,
    AngularFireStorageReference,
    AngularFireUploadTask,
  } from '@angular/fire/storage';
  import { Observable } from 'rxjs';
  import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-profile-comp',
  templateUrl: './profile-comp.component.html',
  styleUrls: ['./profile-comp.component.css']
})
export class ProfileCompComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  category: string = "";
  status: string = "";
  products:any = [];
  user: any ;
  firstName: any ;
  lastName: any ;
  constructor(private ProductService: ProductService, private fileStorage: AngularFireStorage,
    private router: Router) { }

    ngOnInit() {
      let user = JSON.parse(window.localStorage.getItem('id'));
      let firstName  =  JSON.parse(JSON.stringify(window.localStorage.getItem('firstName')))
     //  let lastName   =  JSON.parse(window.localStorage.getItem('lastName'));
     
      this.firstName = firstName ;
     //  this.lastName = lastName ;      
      this.user = user ;

     console.log(user)
     console.log(firstName)
     // console.log(lastName)
     this.ProductService.getProducts().subscribe(( data: any) => {
       for(var i=0 ; i< data.length; i++) {
          if(data[i].ownerId === user ){
            console.log(data[i].ownerId)
            console.log(data[i])
            this.products.push(data[i])
       }
     }
   })
 }

   addCategory(f:NgForm) {
     this.category = f.value.category
     this.status = f.value.category
   }
   selectedFile(event) {
       const id = Math.random().toString(36).substring(2);
       this.ref = this.fileStorage.ref(id);
       this.task = this.ref.put(event.target.files[0]);
       this.uploadProgress = this.task.percentageChanges();
       this.task
         .snapshotChanges()
         .pipe(finalize(() => (this.downloadURL = this.ref.getDownloadURL())))
         .subscribe();
     }
   onSubmit(f: NgForm) {
       var img = document.getElementsByTagName('a');
       var imageUrl = img[img.length - 1].innerHTML;
   
       let user = JSON.parse(window.localStorage.getItem('id'));
       console.log(user)
       console.log(f.value)
       const obj = {
          name:f.value.name,
          oldPrice:f.value.oldPrice,
          newPrice:f.value.newPrice,
          description:f.value.description,
          category:this.category,
          image:imageUrl,
          ownerId:user,
          expireddate:f.value.expireddate,
          creationDate:f.value.creationDate,
          quantity:f.value.quantity,
          device:f.value.device,
          humanKind:f.value.humanKind,
          type:f.value.type,
       }
       if(this.category === 'food'){
           this.ProductService.addFood(obj).subscribe((res)=>{
               console.log(obj)
           console.log(res);
             },
             (error) => {
               console.log(error)
           })
       }
        else if(this.category === 'clothes'){
           this.ProductService.addClothes(obj).subscribe((res)=>{
               console.log(res);
             },
             (error) => {
               console.log(error)
           })
       }
       else if(this.category === 'fourniture'){
           this.ProductService.addFourni(obj).subscribe((res)=>{
               console.log(res);
             },
             (error) => {
               console.log(error)
           })
       }
       else if(this.category === 'electronics'){
           this.ProductService.addElec(obj).subscribe((res)=>{
               console.log(res);
             },
             (error) => {
               console.log(error)
           })
       }
       else if(this.category === 'houseHold'){
           this.ProductService.addHouse(obj).subscribe((res)=>{
               console.log(res);
             },
             (error) => {
               console.log(error)
           })
       }
       else if(this.category === 'cleaning'){
           this.ProductService.addClean(obj).subscribe((res)=>{
               console.log(res);
             },
             (error) => {
               console.log(error)
           })
       }
   }
   changeInfo(){
     this.router.navigateByUrl('/seetingsComp');
   }

}
