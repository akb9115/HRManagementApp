import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedResultsComponent } from './searched-results.component';

describe('SearchedResultsComponent', () => {
  let component: SearchedResultsComponent;
  let fixture: ComponentFixture<SearchedResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchedResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
