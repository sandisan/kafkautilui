import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KafkadetailsComponent } from './kafkadetails.component';

describe('KafkadetailsComponent', () => {
  let component: KafkadetailsComponent;
  let fixture: ComponentFixture<KafkadetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KafkadetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KafkadetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
