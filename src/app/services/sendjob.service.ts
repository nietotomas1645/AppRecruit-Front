import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../interfaces/job';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendjobService {

  private baseUrl:string="https://localhost:7168/api/Job/"
  
  constructor(private http: HttpClient) { }


  jobSV(jobObj:any){
    return this.http.post<any>(`${this.baseUrl}postjob`,jobObj)
  }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('https://localhost:7168/api/Job/GetJobs');
  }

  getJobById(id: number): Observable<Job>{
    return this.http.get<Job>(`${this.baseUrl}${id}`);
  }

}
