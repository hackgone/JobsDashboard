import { Component } from '@angular/core';
import { AlljobsService } from '../../../services/alljobs.service';
import { Jobs } from '../../../interfcae/jobs';
import { User } from '../../../interfcae/user';
import { MatDialog } from '@angular/material/dialog';
import { ApplicantPopupComponent } from '../applicant-popup/applicant-popup.component';

@Component({
  selector: 'app-showall',
  templateUrl: './showall.component.html',
  styleUrl: './showall.component.scss'
})
export class ShowallComponent {
  jobsData:Jobs[]=[];
  jobsApplicant:User[] = [];

  constructor(private jobService:AlljobsService,private dialog:MatDialog){
    jobService.getInitializedJobs().then((jobsObservable) => {
      jobsObservable.subscribe({
        next: (data) => {
          console.log('Jobs fetched:', data);
          this.jobsData = data; // Assign the fetched jobs to the component variable
        },
        error: (err) => console.error('Error fetching jobs:', err),
        complete: () => console.log('Job fetching complete'),
      });
    });
  }

  getApplicant(jobId:number){
    this.jobsData.forEach(val => {
      if (val.id === jobId) {
        this.jobsApplicant = val.applicants;
      }
    });
    this.dialog.open(ApplicantPopupComponent,{
      width:'90%',
      // height:'140px',
      data:this.jobsApplicant
    })
    console.log(this.jobsApplicant)
  }
}
