import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplicaresultComponent } from './replicaresult.component';

describe('ReplicaresultComponent', () => {
  let component: ReplicaresultComponent;
  let fixture: ComponentFixture<ReplicaresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplicaresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplicaresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
