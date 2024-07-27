import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'pane-navigator-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-auto my-3">
      <div
        [class]="
          utils.cn(
            'border-b border-base-content whitespace-nowrap min-w-max w-full',
            {
              'border-none p-1 rounded-lg bg-base-300 shadow-md backdrop-blur-md':
                type === 'pill'
            },
            class
          )
        "
      >
        @for(tab of tabs; track tab.pane ){
        <button
          [class]="
            utils.cn(tabClass, tab.pane === activePane ? activeTabClass : '')
          "
          (click)="onChangeActivePane(tab.pane)"
        >
          {{ tab.tabLabel }}
        </button>
        }
      </div>
    </div>
  `,
})
export class PaneNavigatorPanelComponent {
  @Input({ required: true }) activePane!: string;
  @Input({ required: true }) tabs!:
    | {
        pane: string;
        tabLabel: string;
      }[]
    | null;
  @Input() type: 'tab' | 'pill' = 'tab';
  @Input() class = '';
  @Output() activePaneChange = new EventEmitter();

  tabClass = 'p-2 px-4  transition-all text-sm ';
  get activeTabClass() {
    return this.type === 'tab'
      ? 'border-b-2 border-base-content p-2 px-4 font-medium '
      : 'rounded-lg font-medium';
  }

  constructor(public utils: UtilsService) {}

  onChangeActivePane(selectedPane: string) {
    this.activePane = selectedPane;
    this.activePaneChange.emit(this.activePane);
  }
}
