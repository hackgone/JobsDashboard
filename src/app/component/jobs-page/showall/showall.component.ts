import { Component } from '@angular/core';
import { AlljobsService } from '../../../services/alljobs.service';
import { Jobs } from '../../../interfcae/jobs';
import { User } from '../../../interfcae/user';

@Component({
  selector: 'app-showall',
  templateUrl: './showall.component.html',
  styleUrl: './showall.component.scss'
})
export class ShowallComponent {
  jobsData:Jobs[]=[];
  jobsApplicant:User[] = [];

  constructor(private jobService:AlljobsService){
    this.jobsData = jobService.getJobs();
  }

  getApplicant(jobId:number){
    this.jobsData.forEach(val => {
      if (val.id === jobId) {
        this.jobsApplicant = val.applicants;
      }
    });
    console.log(this.jobsApplicant)
  }
}
