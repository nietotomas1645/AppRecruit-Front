import { Component} from '@angular/core';

import { Router } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { SendjobService } from 'src/app/services/sendjob.service';

@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css']
})


export class ViewJobsComponent {
  
  filterpost:any = '';
  jobList: Job[] | undefined;
  public page!: number;
  
  constructor(private jobservice: SendjobService, private router: Router) { }

  ngOnInit() {
    this.obtenerTrabajo();
  
  }

  obtenerTrabajo(){
    this.jobservice.getAllJobs().subscribe(jobList => {
      this.jobList = jobList;
      console.log(jobList);
    });
  }


  
}
