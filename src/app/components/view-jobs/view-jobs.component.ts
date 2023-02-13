import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { SendjobService } from 'src/app/services/sendjob.service';

@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css']
})
export class ViewJobsComponent {
  displayedColumns: string[] = ['technology','experience','position','seniority','location','salary','actions'];
  dataSource = new MatTableDataSource<Job>();

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  jobList:any;

  
  constructor(private jobservice: SendjobService, private router: Router) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if(this.dataSource.data.length > 0) {
        this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
      }
   
  }

  

  ngOnInit() {
    this.obtenerTrabajo();
  
  }



  obtenerTrabajo(){
    this.jobservice.getAllJobs().subscribe(jobList => {
      this.dataSource.data = jobList;
      console.log(jobList);
    });
  }
}
