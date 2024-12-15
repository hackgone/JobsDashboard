import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfcae/user';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  userDetails!:FormGroup;
  UserGender:string='';
  signup:boolean=true;

  constructor(private formBuilder:FormBuilder,private userData:UserService,private router:Router) {
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
    this.userData.postUserData(user).subscribe({
      next: (id) => console.log(`User added with ID: ${id}`), // Logs the key of the new item
      error: (err) => console.error('Error adding user:', err),
      complete: () => console.log('Add operation complete'),
    });
    console.log(this.userData.getUserData());
    this.userDetails.reset(); // to reset the evalues
    console.log(this.userDetails.value); // Logs the form data
    this.router.navigate(["/login-signup/login"])
    }
    else{
      console.error('Form is invalid!');
    }
    
  }
  toggleForm(){
    this.signup=!this.signup
  }


}
