import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollServiceComponent } from './scroll-service.component';

describe('ScrollServiceComponent', () => {
  let component: ScrollServiceComponent;
  let fixture: ComponentFixture<ScrollServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
