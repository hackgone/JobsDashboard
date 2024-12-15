import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.scss'
})
export class PostJobComponent {
  	jobData!:FormGroup;

  constructor(private formbuilder:FormBuilder,private router : Router){
    this.jobData = formbuilder.group({
      title: this.formbuilder.control('',Validators.required),
      description : this.formbuilder.control('',Validators.required),
      location : this.formbuilder.control('',Validators.required)
    })
  }
  submit(){
    if(this.jobData.valid){
      const formdata = this.jobData.value
      console.log(formdata)
      this.router.navigate(['/jobs-page/showall'])
    }else{
      console.log("Form is not valid")
    }
  }

}
