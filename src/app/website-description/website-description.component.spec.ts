import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteDescriptionComponent } from './website-description.component';

describe('WebsiteDescriptionComponent', () => {
  let component: WebsiteDescriptionComponent;
  let fixture: ComponentFixture<WebsiteDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
