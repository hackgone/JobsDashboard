import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantPopupComponent } from './applicant-popup.component';

describe('ApplicantPopupComponent', () => {
  let component: ApplicantPopupComponent;
  let fixture: ComponentFixture<ApplicantPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicantPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
