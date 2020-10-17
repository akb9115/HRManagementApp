import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedProfilesComponent } from './deleted-profiles.component';

describe('DeletedProfilesComponent', () => {
  let component: DeletedProfilesComponent;
  let fixture: ComponentFixture<DeletedProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
