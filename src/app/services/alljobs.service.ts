import { Injectable } from '@angular/core';
import { Jobs } from '../interfcae/jobs';
import { User } from '../interfcae/user';

@Injectable({
  providedIn: 'root'
})
export class AlljobsService {
  jobsData: Jobs[] = [
    {
      id: 1,
      title: 'Software Developer',
      body: 'Responsible for developing and maintaining web applications.',
      location: 'Bangalore',
      applicants: [
        { name: 'John Doe', gender: 'Male', email: 'john.doe@example.com', password: 'pass1234', skills: 'Angular, TypeScript, JavaScript' },
        { name: 'Jane Smith', gender: 'Female', email: 'jane.smith@example.com', password: 'pass5678', skills: 'React, Node.js, HTML' }
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
        { name: 'William Garcia', gender: 'Male', email: 'william.garcia@example.com', password: 'pass1234', skills: 'Tableau, Power BI, Data Visualization' }
      ]
    }
  ];
  
  constructor() { }
  getJobs():Jobs[]{
    return this.jobsData;
  }
  viewApplicant(jobId: number): User[] | null {
    for (const job of this.jobsData) {
      if (job.id === jobId) {
        return job.applicants;
      }
    }
    return null;
  }
  
  addJob(req:Jobs){
    this.jobsData.push(req);
  }
}
