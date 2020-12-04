import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClientService } from '../services/client.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
 status: string = '';
 email: string = '';
 code: string = '';
  constructor(private ClientService: ClientService,
    private router: Router) { }

  ngOnInit(): void {
    this.status = '' ;
    this.email='' ;
  }

  checkEmail(f: NgForm){
    console.log(f.value.email)
    this.email = f.value.email ;
    this.ClientService.sendEmail(f.value).subscribe((res) => {
          console.log(res)
          this.status = 'code'
          })
  }
  checkCode(f: NgForm){
   console.log(this.email)
   console.log(f.value.code)
   const obj = {
     email : this.email , 
     code : f.value.code
   }
   this.ClientService.checkCode(obj).subscribe((res) => {
    console.log(res)
    if(res.status === 200 ){
      this.status = 'reset'
    }else(res.status !== 200 )
     Swal.fire("Your code is wrong")
     this.status = 'code'
    })
  }
  onSubmit(f: NgForm) {
       const car = /[A-Z]/gi
        const other = /[@,<,>,?,!,&,|,%,$,£]/
        if(f.value.newPassword.match(car)=== null || f.value.newPassword.match(other)===null || f.value.newPassword.length < 8 ){
         Swal.fire ("your newPassword should contain special caracter")
         
        }else if(f.value.newPassword.match(car)!== null && f.value.newPassword.match(other)!==null && f.value.newPassword.length >= 8 ){
              if(f.value.passwordConf === f.value.newPassword ){
                const obj = {
                  email:this.email ,
                  password:f.value.newPassword
                }
               this.ClientService.changePass(obj).subscribe(
                     (res) => {
                         console.log(res);
                       },
                     (error) => {
                          console.log(error);
                       }
                    );
               Swal.fire("your new password is updated succsessfuly")
               this.router.navigateByUrl('/signin');
              }else {
               Swal.fire("reset new password again")
             }

       }
  }
}