import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CompServiceService } from '../services/comp-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgot-comp',
  templateUrl: './forgot-comp.component.html',
  styleUrls: ['./forgot-comp.component.css']
})
export class ForgotCompComponent implements OnInit {
  status: string = '';
  email: string = '';
  constructor(private CompServiceService:CompServiceService , private router: Router ) { }

 
  ngOnInit(): void {
    this.status = '' ;
    this.email='' ;
  }

  checkEmail(f: NgForm){
    console.log(f.value.email)
    this.email = f.value.email ;
    this.CompServiceService.sendEmail(f.value).subscribe((res) => {
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
   this.CompServiceService.checkCode(obj).subscribe((res) => {
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
     //    Swal.fire ("your newPassword should contain special caracter")

         Swal.fire({
          text: "your newPassword should contain special caracter",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          confirmButtonColor: '#fbc658',
        })

         
        }else if(f.value.newPassword.match(car)!== null && f.value.newPassword.match(other)!==null && f.value.newPassword.length >= 8 ){
              if(f.value.passwordConf === f.value.newPassword ){
                const obj = {
                  email:this.email ,
                  password:f.value.newPassword
                }
               this.CompServiceService.changePass(obj).subscribe(
                     (res) => {
                         console.log(res);
                       },
                     (error) => {
                          console.log(error);
                       }
                    );
                    Swal.fire({
                      text: "your new password is updated succsessfuly",
                      showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                      },
                      hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                      },
                      confirmButtonColor: '#fbc658',
                    })
            
            //   Swal.fire("your new password is updated succsessfuly")
               this.router.navigateByUrl('/signinComp');
              }else {
                Swal.fire({
                  text:"reset new password again",
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  },
                  confirmButtonColor: '#fbc658',
                })
             //  Swal.fire("reset new password again")
             }

       }
  }
}