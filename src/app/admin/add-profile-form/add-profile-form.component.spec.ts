import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfileFormComponent } from './add-profile-form.component';

describe('AddProfileFormComponent', () => {
  let component: AddProfileFormComponent;
  let fixture: ComponentFixture<AddProfileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProfileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
