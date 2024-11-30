import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfcae/user';
import { forEachChild } from 'typescript';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  data : User[]=[{
    "name":"Piyush",
    "gender":"Male",
    "email":"Piyush@gmail.com",
    "password":"1234",
    "skills":"HR"
  }]
  getUserData():User[]{
    return this.data
  }
  checkUser(userEmail: string, password: string): boolean {
    // console.log(password)
    for (const user of this.data) {
      if (user.email === userEmail) {
        return user.password === password; // Return immediately when a match is found
      }
    }
    return false; // Return false if no match is found after checking all users
  }
  postUserData(formData:User){
    this.data.push(formData)
  }
  checkEmail(email:string):boolean{
    for (const user of this.data) {
      if (user.email === email) {
        return true;
      }
    }
    return false;
  }

  updateUserPassword(email:string,password:string){
    for (const user of this.data) {
      if (user.email === email) {
        user.password = password;
        console.log(this.data)
        return true;
      }
    }
    return false;
  }
}
