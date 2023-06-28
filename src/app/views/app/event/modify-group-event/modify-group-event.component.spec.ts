import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyGroupEventComponent } from './modify-group-event.component';

describe('ModifyGroupEventComponent', () => {
  let component: ModifyGroupEventComponent;
  let fixture: ComponentFixture<ModifyGroupEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyGroupEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyGroupEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
