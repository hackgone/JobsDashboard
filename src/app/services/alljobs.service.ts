import { Injectable } from '@angular/core';
import { Jobs } from '../interfcae/jobs';
import { User } from '../interfcae/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlljobsService {
  private dbName = 'JobsDB';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;
  private store: any;

  jobsData: Jobs[] = [
    {
      id: 1,
      title: 'Software Developer',
      body: 'Responsible for developing and maintaining web applications.',
      location: 'Bangalore',
      applicants: [
        { name: 'John Doe', gender: 'Male', email: 'john.doe@example.com', password: 'pass1234', skills: 'Angular, TypeScript, JavaScript' },
        { name: 'Jane Smith', gender: 'Female', email: 'jane.smith@example.com', password: 'pass5678', skills: 'React, Node.js, HTML' },
        { name: 'Olivia Martinez', gender: 'Female', email: 'olivia.martinez@example.com', password: 'pass5678', skills: 'Excel, Python, SQL' },
        { name: 'William Garcia', gender: 'Male', email: 'william.garcia@example.com', password: 'pass1234', skills: 'Tableau, Power BI, Data Visualization' },
        { name: 'Sophia Adams', gender: 'Female', email: 'sophia.adams@example.com', password: 'pass7890', skills: 'Docker, Kubernetes, Jenkins' },
        { name: 'Liam Carter', gender: 'Male', email: 'liam.carter@example.com', password: 'pass4321', skills: 'AWS, Azure, CI/CD Pipelines' }
      ]
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      body: 'Create user-friendly designs for mobile and web platforms.',
      location: 'Mumbai',
      applicants: [
        { name: 'Alice Johnson', gender: 'Female', email: 'alice.johnson@example.com', password: 'pass9012', skills: 'Figma, Adobe XD, Sketch' },
        { name: 'Robert Brown', gender: 'Male', email: 'robert.brown@example.com', password: 'pass3456', skills: 'Illustrator, Photoshop, Wireframing' }
      ]
    },
    {
      id: 3,
      title: 'QA Engineer',
      body: 'Ensure product quality through rigorous testing and debugging.',
      location: 'Hyderabad',
      applicants: [
        { name: 'Chris White', gender: 'Male', email: 'chris.white@example.com', password: 'pass6789', skills: 'Manual Testing, Selenium, JIRA' },
        { name: 'Emily Wilson', gender: 'Female', email: 'emily.wilson@example.com', password: 'pass2345', skills: 'Automation Testing, Postman, API Testing' }
      ]
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      body: 'Manage CI/CD pipelines and cloud infrastructure.',
      location: 'Pune',
      applicants: [
        { name: 'Sophia Adams', gender: 'Female', email: 'sophia.adams@example.com', password: 'pass7890', skills: 'Docker, Kubernetes, Jenkins' },
        { name: 'Liam Carter', gender: 'Male', email: 'liam.carter@example.com', password: 'pass4321', skills: 'AWS, Azure, CI/CD Pipelines' }
      ]
    },
    {
      id: 5,
      title: 'Data Analyst',
      body: 'Analyze and interpret complex data sets to provide insights.',
      location: 'Delhi',
      applicants: [
        { name: 'Olivia Martinez', gender: 'Female', email: 'olivia.martinez@example.com', password: 'pass5678', skills: 'Excel, Python, SQL' },
        { name: 'William Garcia', gender: 'Male', email: 'william.garcia@example.com', password: 'pass1234', skills: 'Tableau, Power BI, Data Visualization' },
        { name: 'Sophia Adams', gender: 'Female', email: 'sophia.adams@example.com', password: 'pass7890', skills: 'Docker, Kubernetes, Jenkins' },
        { name: 'Liam Carter', gender: 'Male', email: 'liam.carter@example.com', password: 'pass4321', skills: 'AWS, Azure, CI/CD Pipelines' }
      ]
    }
  ];
  

  private initConnection():any{
    if (!this.db) {
      return Error('console.log("ctor jobs")Database not initialized');
    }

    const transaction = this.db.transaction(['jobs'], 'readwrite');
    return transaction.objectStore('jobs');
  }
  
  constructor() { 
    console.log("ctor jobs")
    this.initDB().then(() => {
      console.log('Database initialized');
      this.populateDummyData(); // Safely populate data after DB is ready
    });
  }
  private initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = (event) => {
        console.error('Database error:', (event.target as any).error);
        reject('Database failed to open');
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('jobs')) {
          db.createObjectStore('jobs', { keyPath: 'id', autoIncrement: true });
          console.log('Object store created/updated');
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(); // Database is ready
      };
    });
  }

  private populateDummyData() {
    if (!this.db) {
      console.error('Database is not initialized.');
      return;
    }
  
    const transaction = this.db.transaction(['jobs'], 'readwrite');
    const store = transaction.objectStore('jobs');
  
    this.jobsData.forEach((job) => {
      const request = store.add(job);
      request.onsuccess = () => console.log('Job inserted:', job);
      request.onerror = (error) => console.error('Error inserting job:', error);
    });
  
    transaction.oncomplete = () => {
      console.log('Dummy data inserted successfully');
      // this.fetchAllJobs(); // Optional: Fetch all jobs after populating
    };
  }
  async getInitializedJobs(): Promise<Observable<Jobs[]>> {
    if (!this.db) {
      await this.initDB();
    }
    return this.getJobs();
  }
  

  getJobs():Observable<Jobs[]>{
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
  viewApplicant(jobId: number): Observable<User[] | null> {
    console.log("the job id is",jobId)
    return new Observable((subscriber) => {
      this.getJobs().subscribe({
        next: (jobs) => {
          console.log("jobs from the get all",jobs,"Feteched id",jobId)
          // jobs.forEach(j => console.log(j.id))
          const job = jobs.find((job) => job.id === jobId);
          console.log(job)
          if (job) {
            subscriber.next(job.applicants);
          } else {
            subscriber.next([]);
          }
          subscriber.complete();
        },
        error: (err) => {
          subscriber.error('Error fetching jobs: ' + err);
        },
      });
    });
  }
  
  addJob(req:Jobs):Observable<number> {
    console.log(req)
    return new Observable((subscriber) => {
      this.store = this.initConnection();
      const request = this.store.add(req);

      request.onsuccess = () => {
        subscriber.next(request.result as number); // Return the key (ID) of the added item
        subscriber.complete();
      };
  
      request.onerror = () => {
        subscriber.error(request.error);
      };
    });
  }
}
