import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { SendjobService } from 'src/app/services/sendjob.service';

@Component({
  selector: 'app-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.css']
})
export class DetailJobComponent {
  id: number;
  job!: Job;


  constructor(private aRoute: ActivatedRoute, private jobservice: SendjobService) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    this.getJobId();
  }


  getJobId(){
    this.jobservice.getJobById(this.id).subscribe(data =>{
      this.job = data;
    })
  }
}
