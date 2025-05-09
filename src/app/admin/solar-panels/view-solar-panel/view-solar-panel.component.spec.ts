import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSolarPanelComponent } from './view-solar-panel.component';

describe('ViewSolarPanelComponent', () => {
  let component: ViewSolarPanelComponent;
  let fixture: ComponentFixture<ViewSolarPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSolarPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSolarPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
