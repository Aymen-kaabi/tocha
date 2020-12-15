import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClientService } from '../services/client.service';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  fieldTextType: boolean;
  focus: any;
  focus1: any;
    constructor( private ClientService: ClientService,
        private router: Router) { }

    ngOnInit():void {}
    onSubmit(f: NgForm) {
       console.log(f.value)
       const car = /[A-Z]/gi
       const other = /[@,<,>,?,!,&,|,%,$,£]/
       if(f.value.password.match(car)=== null || f.value.password.match(other)===null || f.value.password.length < 8 ){
        Swal.fire({
          text: "your password should contain speciel caractere",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          confirmButtonColor: '#fbc658',
        })
        // Swal.fire ("your password should contain speciel caractere")
         
       }else if(f.value.password.match(car)!== null && f.value.password.match(other)!==null && f.value.password.length >= 8 ){
             if(f.value.passwordConf === f.value.password ){
                  this.ClientService.createRegister(f.value).subscribe(
                    (res) => {
                        console.log(res);
                      },
                    (error) => {
                         console.log(error);
                      }
            );
            Swal.fire({
              text: "your request to create a new account is succsesfuly done , wait for email of acceptation",
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              confirmButtonColor: '#fbc658',
            })
          //  Swal.fire("your request to create a new account is succsesfuly done , wait for email of acceptation")
              this.router.navigateByUrl('/signin');
             }else {
              Swal.fire({
                text: "Repeat again please",
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                },
                confirmButtonColor: '#fbc658',
                background:'#FFFFFF'
              })
             // Swal.fire("Repeat again please")
            }
      
      }
}
toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}
}
