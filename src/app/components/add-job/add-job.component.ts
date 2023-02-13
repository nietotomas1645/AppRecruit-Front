import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SendjobService } from 'src/app/services/sendjob.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent {
  sendJobForm!: FormGroup;

  constructor(private fb: FormBuilder, private jobservice: SendjobService, private router: Router,private toast: NgToastService) { }

  ngOnInit() {
    this.sendJobForm = this.fb.group({
      position: ['',Validators.required],
      experience: ['',Validators.required],
      technology: ['',Validators.required],
      company: ['',Validators.required],
      seniority: ['',Validators.required],
      workplace: ['',Validators.required],
      location: ['',Validators.required],
      studies: ['',Validators.required],
      salary: ['',Validators.required],
      aboutpos: ['',Validators.required],
      benefits: ['',Validators.required]

      
    })
  }



  sendJob(){
    //perform logic for signup
    this.jobservice.jobSV(this.sendJobForm.value)
    .subscribe({
      next:(res:any)=>{
        this.toast.success({detail:"Work Loaded!", summary:res.message,duration: 5000})
        this.sendJobForm.reset();
      }
      ,error:((err:any)=>{
        alert(err?.error.message)
      })
  
    })
  }
  

}
