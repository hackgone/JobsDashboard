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

  postUserData(item: User): Observable<number> {
    return new Observable((subscriber) => {
      if (!this.db) {
        subscriber.error('Database not initialized');
        subscriber.complete();
        return;
      }

      const transaction = this.db.transaction(['user'], 'readwrite');
      const store = transaction.objectStore('user');
      const request = store.add(item);

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

      const transaction = this.db.transaction(['user'], 'readonly');
      const store = transaction.objectStore('user');
      const request = store.getAll();
      request.onsuccess = () => {
        subscriber.next(request.result);
        subscriber.complete();
      };

      request.onerror = () => {
        subscriber.error(request.error);
      };
    });
  
  }


  checkUser(userEmail: string, password: string,data:User[]): boolean {
    // console.log(password)
    for (const user of data) {
      if (user.email === userEmail) {
        return user.password === password; // Return immediately when a match is found
      }
    }
    return false; // Return false if no match is found after checking all users
  }
  checkEmail(email:string,data:User[]):boolean{
    for (const user of data) {
      if (user.email === email) {
        return true;
      }
    }
    return false;
  }

  updateUserPassword(email:string,password:string,data:User[]){
    for (const user of data) {
      if (user.email === email) {
        user.password = password;
        console.log(data)
        return true;
      }
    }
    return false;
  }
}
