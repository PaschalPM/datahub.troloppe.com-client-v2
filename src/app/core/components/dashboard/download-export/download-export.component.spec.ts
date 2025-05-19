import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadExportComponent } from './download-export.component';

describe('DownloadExportComponent', () => {
  let component: DownloadExportComponent;
  let fixture: ComponentFixture<DownloadExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadExportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
