import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Job } from 'src/app/interfaces/job';
import { SendjobService } from 'src/app/services/sendjob.service';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent {
  ngOnInit(): void {
    this.getJobId();
  }


  fileForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl('')
  });
  fileToUpload: any;
  files: any = [];
  id!: number;
  job!: Job;

  constructor(private jobservice: SendjobService, private aRoute: ActivatedRoute ,private http:  HttpClient,private toast: NgToastService,private router: Router) {
    this.getAllFiles();
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
   }


   handleFileInput(e: any) {
    this.fileToUpload = e?.target?.files[0];
  }
  saveFileInfo()
  {
    const formData: FormData = new FormData();
    formData.append('myFile', this.fileToUpload);
    formData.append('nombre', this.fileForm.value.nombre!);
    formData.append('apellido', this.fileForm.value.apellido!);
    formData.append('email', this.fileForm.value.email!);
    return this.http.post('https://localhost:7168/api/FileManager', formData,
    {
      headers : new HttpHeaders()})
      .subscribe({
        next:(res)=>{
          this.toast.success({detail:"Successful Upload", duration: 5000})
          this.fileForm.reset();
          this.router.navigate(['getjob']);
        }
        ,error:(err=>{
          this.toast.error({detail:"ERROR", summary: (err?.error.message),duration: 5000})
        })    
       })
      }

  // -------------------- VIEW AND DOWNLOAD FILES --------------------------
  getAllFiles()
  {
    return this.http.get('https://localhost:7168/api/FileManager')
    .subscribe((result) => {
      this.files = result;
      console.log(result);
  });
  }


  downloadFile(id: number, contentType: string)
  {
    return this.http.get(`https://localhost:7168/api/FileManager/${id}`, {responseType: 'blob'})
    .subscribe((result: Blob) => {
      const blob = new Blob([result], { type: contentType }); // you can change the type
      const url= window.URL.createObjectURL(blob);
      window.open(url);
      console.log("Success");
  });
  }

  getJobId(){
    this.jobservice.getJobById(this.id).subscribe(data =>{
      this.job = data;
    })
  }
}
