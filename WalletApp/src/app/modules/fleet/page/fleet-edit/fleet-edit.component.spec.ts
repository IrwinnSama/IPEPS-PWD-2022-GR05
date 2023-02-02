import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetEditComponent } from './fleet-edit.component';

describe('FleetEditComponent', () => {
  let component: FleetEditComponent;
  let fixture: ComponentFixture<FleetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
