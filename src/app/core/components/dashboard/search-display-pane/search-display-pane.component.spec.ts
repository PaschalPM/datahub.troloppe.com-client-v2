import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDisplayPaneComponent } from './search-display-pane.component';

describe('SearchDisplayPaneComponent', () => {
  let component: SearchDisplayPaneComponent;
  let fixture: ComponentFixture<SearchDisplayPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDisplayPaneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchDisplayPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
