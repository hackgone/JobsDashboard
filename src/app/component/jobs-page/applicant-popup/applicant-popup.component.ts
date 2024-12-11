import { Component, Inject, inject, input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../interfcae/user';

@Component({
  selector: 'app-applicant-popup',
  templateUrl: './applicant-popup.component.html',
  styleUrl: './applicant-popup.component.scss'
})
export class ApplicantPopupComponent implements OnInit {
  totalApplicant!:number;
  applicantData:User[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User[],
    private ref: MatDialogRef<ApplicantPopupComponent>
  ) {}
  ngOnInit(): void {
    this.totalApplicant = this.data.length;
    this.applicantData = this.data;
  }

}
