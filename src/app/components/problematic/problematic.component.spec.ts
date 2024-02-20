import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblematicComponent } from './problematic.component';

describe('ProblematicComponent', () => {
  let component: ProblematicComponent;
  let fixture: ComponentFixture<ProblematicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblematicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProblematicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
