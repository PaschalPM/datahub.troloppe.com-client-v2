import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMatIconComponent } from './my-mat-icon.component';

describe('MyMatIconComponent', () => {
  let component: MyMatIconComponent;
  let fixture: ComponentFixture<MyMatIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMatIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyMatIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
