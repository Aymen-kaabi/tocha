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
  import { finalize ,map, catchError } from 'rxjs/operators';
  import { animate } from '@angular/animations';
import { MessagesService } from '../services/messages.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile-comp',
  templateUrl: './profile-comp.component.html',
  styles: [`
  ngb-progressbar {
      margin-top: 5rem;
  }
  `]
})
export class ProfileCompComponent implements OnInit {

  complete=0
  progress: number;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  category: string = "";
  status: string = "";
  products:any = [];
  user: any ;
  name: any ;
  logo:any;
  compStatus: string = "";
  constructor(private ProductService: ProductService, private fileStorage: AngularFireStorage,private msgServer: MessagesService ,
    private router: Router) { }

    ngOnInit() {
      let user = JSON.parse(window.localStorage.getItem('id'));
      let name  =  JSON.parse(JSON.stringify(window.localStorage.getItem('name')))
      this.compStatus  =  JSON.parse(JSON.stringify(window.localStorage.getItem('status')))
      this.logo  =  JSON.parse(JSON.stringify(window.localStorage.getItem('logo')))
     
      this.name = name ;     
      this.user = user ;
     console.log(user)
     console.log(name)
     this.ProductService.getProducts().subscribe(( data: any) => {
       for(var i=0 ; i< data.length; i++) {
          if(data[i].ownerId === user && data[i].ownerType === "company"){
            console.log(data[i].ownerId)
            console.log("type",data[i].ownerType)
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
         .subscribe(); console.log('progress',this.uploadProgress)
     }

   onSubmit(f: NgForm) {
       var img = document.getElementsByTagName('a');
       var imageUrl = img[img.length - 2].innerHTML;
        console.log(img)
        console.log(imageUrl)
       let user = JSON.parse(window.localStorage.getItem('id'));
       console.log(user)
       console.log(f.value)
       const obj = {
          name:f.value.title,
          oldPrice:f.value.oldPrice,
          newPrice:f.value.newPrice,
          description:f.value.description,
          category:this.category,
          image:imageUrl,
          ownerId:user,
          ownerType:this.compStatus,
          expiredDate:f.value.expiredDate,
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
       else if(this.category === 'laboratory'){
        this.ProductService.addLab(obj).subscribe((res)=>{
            console.log(res);
          },
          (error) => {
            console.log(error)
        })
    }

    Swal.fire({
      text: "your product will be soon added , after being verified by the admin!",
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      confirmButtonColor: '#fbc658',
    }).then(()=> window.location.reload())

    
   }
   changeInfo(){
     this.router.navigateByUrl('/seetingsComp');
   }

   onSend(msg: NgForm){
    if(msg.value.text !== ""){
      let user= JSON.parse(window.localStorage.getItem('id'));
      const obj = {
        receiverId: user,
        messageSent: msg.value.text,
      }
      console.log(obj);
      this.msgServer.addMessages(obj).subscribe((res)=>{
        console.log('msg',res);
      },
      (error) => {
      console.log(error);
      })
     window.location.reload();
    }
  }

   
}
