import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLinksFooterComponent } from './social-links-footer.component';

describe('SocialLinksFooterComponent', () => {
  let component: SocialLinksFooterComponent;
  let fixture: ComponentFixture<SocialLinksFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialLinksFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocialLinksFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
