
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  registrationForm: FormGroup;
  fieldTextType: boolean;
  user = {
    email: '',
    password: '',
  };
  focus: any;
  focus1: any;
  constructor( private ClientService: ClientService,
    private router: Router, private formbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initRegForm();
  }
  login() {
    const data = {
      email: this.user.email,
      password: this.user.password,
    };
    this.ClientService.createLogin(data).subscribe(
      (res) => {
        if (res.status === 404) {
          Swal.fire('your email does not exist !');
        } else if (res.status === 500) {
          Swal.fire('wrong password, try again !');
        } else {
          console.log(res);
          window.localStorage.setItem('token', res.token);
          window.localStorage.setItem('id', res.id);
          window.localStorage.setItem('firstName', res.firstName);
          window.localStorage.setItem('lastName', res.lastName);
          window.localStorage.setItem('status', res.status);
          window.localStorage.setItem('email', res.email);
          window.localStorage.setItem('phoneNumber', res.phoneNumber);
          window.localStorage.setItem('street', res.street);
          window.localStorage.setItem('city', res.city);
          window.localStorage.setItem('zipCode', res.zipCode);
          this.router.navigateByUrl('/landing');
        }
      },
      (error) => {
        console.log(window.localStorage);
        console.log(error);
      }
    );
  }
  initRegForm() {
    this.registrationForm = this.formbuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}