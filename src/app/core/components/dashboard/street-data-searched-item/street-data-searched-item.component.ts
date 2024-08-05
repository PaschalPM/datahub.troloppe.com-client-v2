import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'street-data-searched-item',
  standalone: true,
  imports: [],
  template: `
    <div
      class=" w-full p-3 flex text-sm gap-1 cursor-pointer hover:bg-base-200 transition-all border-b border-base-content/15"
      (click)="emitClickEvent()"
      >
      <span class="text-xl w-fit self-center"> 🔍 </span>
      <div>
        <img
          [src]="searchedStreetData.imagePath"
          [alt]="searchedStreetData.streetAddress"
          class="size-10"
        />
      </div>
      <div class="grow ml-2">
        <p class="font-semibold">
          {{ searchedStreetData.streetAddress }}
        </p>
        <p class="text-xs mt-.5">
          {{ searchedStreetData.developmentName }}
        </p>
      </div>
      <small class="self-end font-semibold">
        #{{ searchedStreetData.uniqueCode }}
      </small>
    </div>
  `,
  styles: `
    :host{
      display: contents
    }
  `,
})
export class StreetDataSearchedItemComponent {
  @Input({ required: true }) searchedStreetData!: SearchedStreetDataType;
  @Output() clickEvent = new EventEmitter<SearchedStreetDataType>()

  emitClickEvent()
  {
    alert("Hello")
    this.clickEvent.emit(this.searchedStreetData)
  }
}
