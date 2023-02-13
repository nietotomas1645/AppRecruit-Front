import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string ="fa-eye-slash"
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,private toast: NgToastService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }


  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type ="password"
  }


  onSingup(){
    //perform logic for signup
    this.auth.signUp(this.signUpForm.value)
    .subscribe({
      next:(res)=>{
        this.toast.success({detail:"Successful Registration", summary:res.message,duration: 5000})
        this.signUpForm.reset();
        this.router.navigate(['login']);
      }
      ,error:(err=>{
        this.toast.error({detail:"ERROR", summary: (err?.error.message),duration: 5000})
      })    
     })
  }
}
