import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfcae/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  userDetails!:FormGroup;
  UserGender:string='';
  signup:boolean=true;

  constructor(private formBuilder:FormBuilder,private userData:UserService) {
    this.userDetails=formBuilder.group({
      name:this.formBuilder.control('',Validators.required),
      email: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]
      ],
      password:['',Validators.required],
      cPassword:['',Validators.required],
      skills:['',Validators.required],
      gender:['',Validators.required]

    })
  }
  genderbuttonClick(gender:string):void {
    
    this.userDetails.get('gender')?.setValue(gender);
    this.UserGender = gender;
  }
  saveData() {
    if (this.userDetails.valid){
      const formValue = this.userDetails.value;
    const user: User = {
      name:formValue.name,
      email: formValue.email,
      password: formValue.password,
      skills: formValue.skills,
      gender: formValue.gender
    };
    this.userData.postUserData(user)
    console.log(this.userData.getUserData());
    this.userDetails.reset(); // to reset the evalues
    console.log(this.userDetails.value); // Logs the form data
    }
    else{
      console.error('Form is invalid!');
    }
    
  }
  toggleForm(){
    this.signup=!this.signup
  }


}
