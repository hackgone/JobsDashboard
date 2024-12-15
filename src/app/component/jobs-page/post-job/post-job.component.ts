import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlljobsService } from '../../../services/alljobs.service';
import { Jobs } from '../../../interfcae/jobs';
import { Store } from '@ngrx/store';
import { userLoggedIn } from '../../../shared/store/user.actions';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.scss'
})
export class PostJobComponent {
  	jobData!:FormGroup;
    jobCount : number = 5;

  constructor(private formbuilder:FormBuilder,private router : Router,private jobService:AlljobsService , private store: Store<{ userState: any}>){
    this.jobData = formbuilder.group({
      title: this.formbuilder.control('',Validators.required),
      description : this.formbuilder.control('',Validators.required),
      location : this.formbuilder.control('',Validators.required)
    })
  }
  submit(){
    if(this.jobData.valid){
      const formdata = this.jobData.value;
      const newJob: Jobs = {
        id: Date.now(), // Using timestamp for unique ID; replace with better ID logic if needed
        title: formdata.title || '', // Assuming 'title' exists in formdata
        body: formdata.description || '',   // Assuming 'body' exists in formdata
        location: formdata.location || '', // Assuming 'location' exists in formdata
        applicants: [], // Initialize as empty, or populate with applicants if provided
      };
      this.jobService.addJob(newJob).subscribe({
        next: (id) => console.log('Job added with ID:', id),
        error: (err) => console.error('Failed to add job:', err),
        complete: () => console.log('Job addition complete'),
      });
      // console.log(formdata)
      //call the state
      this.store.dispatch(userLoggedIn())
      this.router.navigate(['/jobs-page/showall'])
    }else{
      console.log("Form is not valid")
    }
  }

}
