import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingHoursComponent } from './teacher.component';

describe('TeacherComponent', () => {
  let component: TeachingHoursComponent;
  let fixture: ComponentFixture<TeachingHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachingHoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
