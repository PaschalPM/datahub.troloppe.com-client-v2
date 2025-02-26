

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAndDownloadStreetDataBtnsComponent } from './create-and-download-street-data-btns.component';

describe('CreateAndDownloadStreetDataBtnsComponent', () => {
  let component: CreateAndDownloadStreetDataBtnsComponent;
  let fixture: ComponentFixture<CreateAndDownloadStreetDataBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAndDownloadStreetDataBtnsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAndDownloadStreetDataBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

