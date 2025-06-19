import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface InvestmentSector {
  key: string;
  label: string;
}

@Component({
  selector: 'investment-sector-selector',
  standalone: true,
  imports: [],
  template: './investment-sector-selector.component.html',
})
export class InvestmentSectorSelectorComponent {
  @Input() sectors: InvestmentSector[] = [];
  @Input() selectedSector: string = '';
  @Output() sectorChange = new EventEmitter<string>();

  onChange(newValue: string) {
    this.sectorChange.emit(newValue);
  }
}
