import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfcae/user';
import { forEachChild } from 'typescript';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbName = 'UserDB';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;
  private store: any;

  constructor(){
    this.initDB();
    
  }
  //to initalize the indexDb
  private initDB() {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onerror = (event) => {
      console.error('Database error:', (event.target as any).error);
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      console.log('Database initialized');
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('user')) {
        db.createObjectStore('user', { keyPath: 'id', autoIncrement: true });
      }
      console.log('Object store created/updated');
    };
  }
  private initConnection():any{
    if (!this.db) {
      return Error('Database not initialized');
    }

    const transaction = this.db.transaction(['user'], 'readwrite');
    return transaction.objectStore('user');
  }

  postUserData(item: User): Observable<number> {
    return new Observable((subscriber) => {
      this.store = this.initConnection();
      const request = this.store.add(item);

      request.onsuccess = () => {
        subscriber.next(request.result as number); // Return the key (ID) of the added item
        subscriber.complete();
      };
  
      request.onerror = () => {
        subscriber.error(request.error);
      };
    });
  }

  getUserData(): Observable<User[]> {
    return new Observable((subscriber) => {
      if (!this.db) {
        subscriber.error('Database not initialized');
        subscriber.complete();
        return;
      }

      this.store = this.initConnection();
      const request = this.store.getAll();
      request.onsuccess = () => {
        subscriber.next(request.result);
        subscriber.complete();
      };

      request.onerror = () => {
        subscriber.error(request.error);
      };
    });
  
  }

//for auth
  checkUser(email: string, password: string): Observable<boolean> {
    // console.log(password)
    return new Observable((subscriber) => { //always make the object of Observable
      if (!this.db) {
        subscriber.error('Database not initialized');
        subscriber.complete();
        return;
      }
  
      const store = this.initConnection();
      if (store instanceof Error) {
        subscriber.error(store);
        subscriber.complete();
        return;
      }
      //get all the data
      const request = store.getAll();
      request.onsuccess = () => {
        const users: User[] = request.result; //get the user array
        const emailExists = users.some(user => user.email === email && user.password === password);
        subscriber.next(emailExists); //emmit the result
        subscriber.complete(); // so that it wont send the more 
      };
  
      request.onerror = () => {
        subscriber.error(request.error); //send the error message
      };
    }); // Return false if no match is found after checking all users
  }
  //for restting the password email check
  checkEmail(email: string): Observable<boolean> {
    return new Observable((subscriber) => { //always make the object of Observable
      if (!this.db) {
        subscriber.error('Database not initialized');
        subscriber.complete();
        return;
      }
  
      const store = this.initConnection();
      if (store instanceof Error) {
        subscriber.error(store);
        subscriber.complete();
        return;
      }
      //get all the data
      const request = store.getAll();
      request.onsuccess = () => {
        const users: User[] = request.result; //get the user array
        // console.log(users)
        const emailExists = users.some(user => user.email === email);
        //console.log(emailExists)
        subscriber.next(emailExists); //emmit the result
        subscriber.complete(); // so that it wont send the more 
      };
  
      request.onerror = () => {
        subscriber.error(request.error); //send the error message
      };
    });
  }
  

  updateUserPassword(email: string, password: string): Observable<boolean> {
    return new Observable((subscriber) => {
      if (!this.db) {
        subscriber.error('Database not initialized');
        subscriber.complete();
        return;
      }
  
      const store = this.initConnection();
      if (store instanceof Error) {
        subscriber.error(store.message);
        subscriber.complete();
        return;
      }
  
      const request = store.getAll();
      request.onsuccess = () => {
        const users: User[] = request.result; // Retrieve all user data
        let updated = false;
  
        users.forEach((user) => {
          if (user.email === email) {
            user.password = password; // Update the password
            store.put(user); // Use put() to update the user in the object store
            updated = true;
          }
        });
  
        if (updated) {
          subscriber.next(true); // Emit success
        } else {
          subscriber.next(false); // Emit failure (email not found)
        }
  
        subscriber.complete(); // Complete the Observable
      };
  
      request.onerror = () => {
        subscriber.error(request.error); // Handle any errors during the request
      };
    });
  }
  
}
